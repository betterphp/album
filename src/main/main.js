import { app, protocol } from "electron";
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

app.on("ready", () => {
    // Register a custom handler to make file:// URLs work
    // https://github.com/electron/electron/issues/23757#issuecomment-640146333
    protocol.registerFileProtocol("file", (request, callback) => {
        const pathname = request.url.replace("file:///", "");

        callback(pathname);
    });

    // Create the main app window
    createAppWindow();
});

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
