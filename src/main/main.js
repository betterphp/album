import { app } from "electron";
import path from "path";
import { createAppWindow } from "./app-window";

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require("electron-squirrel-startup")) { // eslint-disable-line global-require
    app.quit();
}

// Workaround for https://github.com/electron-userland/electron-webpack/issues/239
app.name = process.env.PRODUCT_NAME;

app.setPath("userData", path.join(
    app.getPath("appData"),
    app.getName()
));

// Create the app window once Electron is ready
app.on("ready", createAppWindow);

// Quit when all windows are closed. On OS X it is common for applications and
// their menu bar to stay active until the user quits explicitly with Cmd + Q
app.on("window-all-closed", () => {
    if (process.platform !== "darwin") {
        app.quit();
    }
});

app.on("activate", () => {
    if (window === null) {
        createAppWindow();
    }
});
