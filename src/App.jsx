import { useEffect } from "react";
import { StatusBar, Style } from "@capacitor/status-bar";
import TMSDashboard from "./TMSDashboard";

function App() {
  useEffect(() => {
    // Biar konten turun, tidak nabrak status bar
    StatusBar.setOverlaysWebView({ overlay: false });

    // Warna background status bar
    StatusBar.setBackgroundColor({ color: "#ffffff" });

    // Style text status bar: Dark → hitam (cocok di background terang)
    StatusBar.setStyle({ style: Style.Dark });
  }, []);

  return <TMSDashboard />;
}

export default App;
