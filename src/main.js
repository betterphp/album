/* global require process path __dirname */
import { app, BrowserWindow } from "electron";

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require("electron-squirrel-startup")) { // eslint-disable-line global-require
    app.quit();
}

// Keep a global reference of the window object
let window;

const createWindow = () => {
    window = new BrowserWindow({
        webPreferences: {
            nodeIntegration: true,
            webSecurity: false,
        },
        width: 800,
        height: 600,
    });

    // Run the live-reload enabled version for dev environment
    if (process.env.ENVIRONMENT === "development") {
        window.loadURL("http://localhost:3000");
    } else {
        window.loadFile(path.join(__dirname, "/../build/index.html"));
    }

    window.on("closed", () => {
        // Dereference the window object
        window = null;
    });
};

// Create the app window once Electron is ready
app.on("ready", createWindow);

// Quit when all windows are closed. On OS X it is common for applications and
// their menu bar to stay active until the user quits explicitly with Cmd + Q
app.on("window-all-closed", () => {
    if (process.platform !== "darwin") {
        app.quit();
    }
});

app.on("activate", () => {
    if (window === null) {
        createWindow();
    }
});
