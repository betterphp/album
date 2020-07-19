import { BrowserWindow } from "electron";
import installExtension from "electron-devtools-installer";
import { REACT_DEVELOPER_TOOLS } from "electron-devtools-installer";

let window;

const createAppWindow = () => {
    window = new BrowserWindow({
        width: 1000,
        height: 600,
        webPreferences: {
            enableRemoteModule: true,
            nodeIntegration: true,
            webSecurity: false,
        },
    });

    window.on("closed", () => {
        // Dereference the window object
        window = null;
    });

    if (process.env.NODE_ENV === "development") {
        // Install react dev tools extension for development
        installExtension(REACT_DEVELOPER_TOOLS).then(() => {;
            window.webContents.openDevTools();
        });

        // Load the webpack dev server version of the app
        window.loadURL(`http://localhost:${process.env.DEV_SERVER_PORT}/index.html`);
    } else {
        // Hide the title bar menu
        window.setMenu(null);

        // Load the compiled version of the app
        window.loadFile("build/index.html");
    }
};

const destroyAppWindow = () => {
    if (window) {
        window.close();
        window = null;
    }
};

export {
    createAppWindow,
    destroyAppWindow,
};
