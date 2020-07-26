const { remote } = window.require("electron");
const app = remote.app;
const path = remote.require("path");
const fs = remote.require("fs");

const configFilePath = path.join(app.getPath("userData"), "config.json");

const defaultConfig = {
    managedPaths: [
        app.getPath("pictures"),
    ],
};

const loadConfigFile = () => {
    return new Promise((resolve, reject) => {
        fs.readFile(configFilePath, (err, data) => {
            if (err && err.code === "ENOENT") {
                // Return the default config if the file is not there
                resolve(defaultConfig);
            } else if (!data) {
                // Throw any other error
                reject(err);
            } else {
                // Or parse the json data
                resolve(window.JSON.parse(data));
            }
        });
    });
};

const saveConfigFile = (newConfig) => {
    return new Promise((resolve, reject) => {
        const newData = window.JSON.stringify(newConfig, null, 4);

        fs.writeFile(configFilePath, newData, (error) => {
            if (error) {
                reject(error);
            } else {
                resolve();
            }
        });
    });
};

export {
    configFilePath,
    defaultConfig,
    loadConfigFile,
    saveConfigFile,
};
