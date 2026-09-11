package it.lagobin.admin;

import android.app.Notification;
import android.app.NotificationChannel;
import android.app.NotificationManager;
import android.app.PendingIntent;
import android.app.Service;
import android.content.Context;
import android.content.Intent;
import android.content.SharedPreferences;
import android.media.RingtoneManager;
import android.net.Uri;
import android.os.Build;
import android.os.IBinder;
import android.os.VibrationEffect;
import android.os.Vibrator;

import androidx.annotation.Nullable;
import androidx.core.app.NotificationCompat;

import com.google.firebase.firestore.DocumentSnapshot;
import com.google.firebase.auth.FirebaseAuth;
import com.google.firebase.firestore.FirebaseFirestore;
import com.google.firebase.firestore.ListenerRegistration;

import java.util.HashSet;
import java.util.Set;

// ── NATIVE ORDER-WATCHER BACKGROUND SERVICE ──
// The WebView's JS Firestore listener only keeps working while the app is
// visibly active on screen — Android throttles/suspends WebView JavaScript
// once the screen turns off or another app comes to the front, so a new
// order arriving at that moment can get silently missed. This service uses
// the native (non-JS) Firebase SDK to keep its OWN independent Firestore
// connection open as a foreground service, so it can keep watching for new
// pending orders and raise a notification even while the WebView is asleep.
public class OrderWatcherService extends Service {

    public static final String CHANNEL_ID_PERSISTENT = "lagobin_watcher_persistent";
    public static final String CHANNEL_ID_ALERT = "lagobin_new_order_alert";
    private static final int NOTIFICATION_ID_PERSISTENT = 1001;

    private ListenerRegistration listenerRegistration;
    private final Set<String> knownPendingIds = new HashSet<>();
    private boolean firstSnapshot = true;

    @Override
    public void onCreate() {
        super.onCreate();
        createNotificationChannels();
        startForeground(NOTIFICATION_ID_PERSISTENT, buildPersistentNotification());
        signInAndListen();
    }

    @Override
    public int onStartCommand(Intent intent, int flags, int startId) {
        // START_STICKY: if Android ever kills this service under memory
        // pressure, it will try to automatically restart it.
        return START_STICKY;
    }

    @Nullable
    @Override
    public IBinder onBind(Intent intent) { return null; }

    private void signInAndListen() {
        SharedPreferences prefs;
        try {
            prefs = NativeAuthBridge.getEncryptedPrefs(getApplicationContext());
        } catch (Exception e) {
            stopSelf();
            return;
        }
        String email = prefs.getString(NativeAuthBridge.KEY_EMAIL, null);
        String password = prefs.getString(NativeAuthBridge.KEY_PASSWORD, null);
        if (email == null || password == null) {
            // No saved admin login yet (or it was cleared on logout) —
            // nothing to authenticate with, so there's nothing to watch.
            stopSelf();
            return;
        }

        FirebaseAuth auth = FirebaseAuth.getInstance();
        if (auth.getCurrentUser() != null) {
            startListening();
            return;
        }
        auth.signInWithEmailAndPassword(email, password)
            .addOnSuccessListener(result -> startListening())
            .addOnFailureListener(e -> {
                // Wrong/changed password — nothing more this service can do
                // until the person logs in again from the app (which
                // re-saves fresh credentials via NativeAuthBridge).
                stopSelf();
            });
    }

    private void startListening() {
        FirebaseFirestore db = FirebaseFirestore.getInstance();
        listenerRegistration = db.collection("orders")
            .whereEqualTo("status", "pending")
            .addSnapshotListener((snapshots, error) -> {
                if (error != null || snapshots == null) return;
                Set<String> currentIds = new HashSet<>();
                for (DocumentSnapshot doc : snapshots.getDocuments()) {
                    currentIds.add(doc.getId());
                }
                if (!firstSnapshot) {
                    for (DocumentSnapshot doc : snapshots.getDocuments()) {
                        if (!knownPendingIds.contains(doc.getId())) {
                            Object tableObj = doc.get("table");
                            String table = tableObj != null ? tableObj.toString() : "?";
                            showNewOrderNotification(table);
                        }
                    }
                }
                firstSnapshot = false;
                knownPendingIds.clear();
                knownPendingIds.addAll(currentIds);
            });
    }

    private void showNewOrderNotification(String table) {
        NotificationManager nm = (NotificationManager) getSystemService(Context.NOTIFICATION_SERVICE);
        Intent launchIntent = getPackageManager().getLaunchIntentForPackage(getPackageName());
        PendingIntent pendingIntent = PendingIntent.getActivity(
                this, 0, launchIntent,
                PendingIntent.FLAG_UPDATE_CURRENT | PendingIntent.FLAG_IMMUTABLE
        );
        Uri soundUri = RingtoneManager.getDefaultUri(RingtoneManager.TYPE_NOTIFICATION);
        Notification notification = new NotificationCompat.Builder(this, CHANNEL_ID_ALERT)
                .setSmallIcon(getApplicationInfo().icon)
                .setContentTitle("🔔 Nuovo Ordine — Tavolo " + table)
                .setContentText("Apri l'app per approvarlo.")
                .setPriority(NotificationCompat.PRIORITY_HIGH)
                .setCategory(NotificationCompat.CATEGORY_ALARM)
                .setAutoCancel(true)
                .setSound(soundUri)
                .setContentIntent(pendingIntent)
                .build();
        if (nm != null) nm.notify((int) System.currentTimeMillis(), notification);

        Vibrator vibrator = (Vibrator) getSystemService(Context.VIBRATOR_SERVICE);
        if (vibrator != null) {
            if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
                vibrator.vibrate(VibrationEffect.createWaveform(new long[]{0, 400, 200, 400}, -1));
            } else {
                vibrator.vibrate(new long[]{0, 400, 200, 400}, -1);
            }
        }
    }

    private Notification buildPersistentNotification() {
        return new NotificationCompat.Builder(this, CHANNEL_ID_PERSISTENT)
                .setSmallIcon(getApplicationInfo().icon)
                .setContentTitle("Lago Bin — Monitoraggio attivo")
                .setContentText("In ascolto per nuovi ordini in arrivo.")
                .setPriority(NotificationCompat.PRIORITY_LOW)
                .setOngoing(true)
                .build();
    }

    private void createNotificationChannels() {
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
            NotificationManager nm = getSystemService(NotificationManager.class);
            NotificationChannel persistent = new NotificationChannel(
                    CHANNEL_ID_PERSISTENT, "Monitoraggio ordini", NotificationManager.IMPORTANCE_LOW);
            persistent.setDescription("Notifica permanente che indica che l'app sta monitorando i nuovi ordini.");
            NotificationChannel alert = new NotificationChannel(
                    CHANNEL_ID_ALERT, "Nuovo ordine", NotificationManager.IMPORTANCE_HIGH);
            alert.setDescription("Avviso quando arriva un nuovo ordine, anche a schermo spento.");
            alert.enableVibration(true);
            if (nm != null) {
                nm.createNotificationChannel(persistent);
                nm.createNotificationChannel(alert);
            }
        }
    }

    @Override
    public void onDestroy() {
        if (listenerRegistration != null) listenerRegistration.remove();
        super.onDestroy();
    }
}
