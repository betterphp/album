const { remote } = window.require("electron");
const app = remote.app;
const path = remote.require("path");
const fs = remote.require("fs");
const sharp = remote.require("sharp");

const isHandledFile = (name) => {
    const ext = name.toLowerCase().split(".").pop();

    return ext === "jpg" || ext === "jpeg";
};

const createFileThumbnail = (file) => {
    return new Promise((resolve, reject) => {
        const folder = path.dirname(file);
        const fileName = path.basename(file);
        const thumbFile = `${folder}/.album/thumbnails/${fileName}`;

        sharp(file)
            .resize({
                width: 400,
                height: 300,
                fit: "cover",
            })
            .toFile(thumbFile, (err, info) => {
                if (err) {
                    reject(err);
                } else {
                    resolve();
                }
            })
    });
};

const getFilePromises = (folder) => {
    return new Promise((resolve) => {
        fs.readdir(folder, {}, (err, result) => {
            const promises = result.filter(isHandledFile)
                                   .map(createFileThumbnail);

            resolve(promises);
        });
    });
};

const createThumbnailsForFolder = (folder) => {
    const promises = getFilePromises(folder);
};

const createThumbnailsForFoldersList = (folders) => {
    return new Promise((resolve) => {
        //
    });
};

export {
    createThumbnailsForFolder,
    createThumbnailsForFoldersList,
};
