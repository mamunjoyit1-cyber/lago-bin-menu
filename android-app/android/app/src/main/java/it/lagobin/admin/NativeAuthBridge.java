package it.lagobin.admin;

import android.content.Context;
import android.content.Intent;
import android.content.SharedPreferences;
import android.net.Uri;
import android.os.PowerManager;
import android.provider.Settings;

import androidx.security.crypto.EncryptedSharedPreferences;
import androidx.security.crypto.MasterKey;

import com.getcapacitor.JSObject;
import com.getcapacitor.Plugin;
import com.getcapacitor.PluginCall;
import com.getcapacitor.PluginMethod;
import com.getcapacitor.annotation.CapacitorPlugin;

// ── NATIVE AUTH BRIDGE ──
// The background OrderWatcherService runs outside the WebView and needs its
// own Firebase Auth session (the WebView's JS-side login isn't visible to
// native code — separate SDKs, separate storage). This plugin lets the web
// app hand the SAME admin email/password to the native side right after a
// successful login, stored encrypted on-device, so the watcher service can
// sign in on its own and keep listening even when the WebView is asleep.
@CapacitorPlugin(name = "NativeAuthBridge")
public class NativeAuthBridge extends Plugin {

    public static final String PREFS_NAME = "lagobin_secure_prefs";
    public static final String KEY_EMAIL = "admin_email";
    public static final String KEY_PASSWORD = "admin_password";

    public static SharedPreferences getEncryptedPrefs(Context ctx) throws Exception {
        MasterKey masterKey = new MasterKey.Builder(ctx)
                .setKeyScheme(MasterKey.KeyScheme.AES256_GCM)
                .build();
        return EncryptedSharedPreferences.create(
                ctx,
                PREFS_NAME,
                masterKey,
                EncryptedSharedPreferences.PrefKeyEncryptionScheme.AES256_SIV,
                EncryptedSharedPreferences.PrefValueEncryptionScheme.AES256_GCM
        );
    }

    @PluginMethod
    public void saveCredentials(PluginCall call) {
        String email = call.getString("email");
        String password = call.getString("password");
        if (email == null || password == null) {
            call.reject("Email o password mancante.");
            return;
        }
        try {
            SharedPreferences prefs = getEncryptedPrefs(getContext());
            prefs.edit().putString(KEY_EMAIL, email).putString(KEY_PASSWORD, password).apply();
            Intent serviceIntent = new Intent(getContext(), OrderWatcherService.class);
            getContext().startForegroundService(serviceIntent);
            JSObject ret = new JSObject();
            ret.put("success", true);
            call.resolve(ret);
        } catch (Exception e) {
            call.reject("Errore nel salvataggio delle credenziali: " + e.getMessage());
        }
    }

    @PluginMethod
    public void clearCredentials(PluginCall call) {
        try {
            SharedPreferences prefs = getEncryptedPrefs(getContext());
            prefs.edit().clear().apply();
            getContext().stopService(new Intent(getContext(), OrderWatcherService.class));
            call.resolve();
        } catch (Exception e) {
            call.reject("Errore durante la pulizia delle credenziali: " + e.getMessage());
        }
    }

    // Shows Android's standard "ignore battery optimizations" system prompt.
    // Without this, Android may eventually stop the watcher service anyway
    // to save battery, even though it's a foreground service.
    @PluginMethod
    public void requestBatteryOptimizationExemption(PluginCall call) {
        try {
            String packageName = getContext().getPackageName();
            PowerManager pm = (PowerManager) getContext().getSystemService(Context.POWER_SERVICE);
            if (pm != null && !pm.isIgnoringBatteryOptimizations(packageName)) {
                Intent intent = new Intent(Settings.ACTION_REQUEST_IGNORE_BATTERY_OPTIMIZATIONS);
                intent.setData(Uri.parse("package:" + packageName));
                intent.addFlags(Intent.FLAG_ACTIVITY_NEW_TASK);
                getContext().startActivity(intent);
            }
            call.resolve();
        } catch (Exception e) {
            call.reject("Errore: " + e.getMessage());
        }
    }
}
