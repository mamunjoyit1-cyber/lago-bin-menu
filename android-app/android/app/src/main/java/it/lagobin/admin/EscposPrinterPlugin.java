package it.lagobin.admin;

import android.util.Base64;
import com.getcapacitor.JSObject;
import com.getcapacitor.Plugin;
import com.getcapacitor.PluginCall;
import com.getcapacitor.PluginMethod;
import com.getcapacitor.annotation.CapacitorPlugin;

import java.io.OutputStream;
import java.net.InetSocketAddress;
import java.net.Socket;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;

// ── NETWORK THERMAL PRINTER (ESC/POS over raw TCP) ──
// The restaurant's POS-80 printers are on the local WiFi/LAN with their own
// IP address, listening for raw ESC/POS bytes (the industry-standard
// protocol thermal printers use) on a TCP port — almost always port 9100.
// This mirrors what the Windows Electron app's "silent-print" IPC handler
// does (main.js), but instead of asking Windows to route to a named
// installed printer, it opens a socket straight to the printer's IP and
// writes the bytes itself. The JS side builds the ESC/POS byte sequence
// (text, bold, cut, etc.) and hands it here as base64 to be sent as-is.
@CapacitorPlugin(name = "EscposPrinter")
public class EscposPrinterPlugin extends Plugin {

    // Keep printing off the UI thread — socket I/O must never block it.
    private final ExecutorService executor = Executors.newSingleThreadExecutor();

    @PluginMethod
    public void printRaw(PluginCall call) {
        String ip = call.getString("ip");
        Integer port = call.getInt("port", 9100);
        String base64Data = call.getString("data");

        if (ip == null || ip.trim().isEmpty()) {
            call.reject("Indirizzo IP della stampante mancante.");
            return;
        }
        if (base64Data == null) {
            call.reject("Nessun dato da stampare.");
            return;
        }

        final String finalIp = ip.trim();
        final int finalPort = port;
        final byte[] bytes;
        try {
            bytes = Base64.decode(base64Data, Base64.DEFAULT);
        } catch (Exception e) {
            call.reject("Dati di stampa non validi: " + e.getMessage());
            return;
        }

        executor.execute(() -> {
            Socket socket = null;
            try {
                socket = new Socket();
                // 5s connect timeout: fail fast if the printer is off/unreachable
                // instead of hanging the approve/print button indefinitely.
                socket.connect(new InetSocketAddress(finalIp, finalPort), 5000);
                socket.setSoTimeout(5000);
                OutputStream out = socket.getOutputStream();
                out.write(bytes);
                out.flush();
                JSObject ret = new JSObject();
                ret.put("success", true);
                call.resolve(ret);
            } catch (Exception e) {
                call.reject("Errore di stampa (" + finalIp + ":" + finalPort + "): " + e.getMessage());
            } finally {
                if (socket != null) {
                    try { socket.close(); } catch (Exception ignored) {}
                }
            }
        });
    }
}
