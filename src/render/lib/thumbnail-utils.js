import _ from "lodash";

const { remote } = window.require("electron");
const app = remote.app;
const path = remote.require("path");
const fs = remote.require("fs");
const mkdirp = remote.require("mkdirp");
const sharp = remote.require("sharp");
const { default: PQueue } = remote.require("p-queue");
const os = remote.require("os")

const isHandledFile = (name) => {
    const ext = name.toLowerCase().split(".").pop();

    return ext === "jpg" || ext === "jpeg";
};

const createFileThumbnail = (file) => {
    return new Promise((resolve, reject) => {
        const folder = path.dirname(file);
        const fileName = path.basename(file);
        const thumbFolder = `${folder}/.album/thumbnails`;
        const thumbFile = `${thumbFolder}/${fileName}`;

        mkdirp(thumbFolder).then(() => {
            sharp(file)
                .resize({
                    width: 1000,
                    height: 750,
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
    });
};

const getFilePromises = (folder) => {
    return new Promise((resolve) => {
        fs.readdir(folder, {}, (err, result) => {
            const promises = result.filter(isHandledFile)
                                   .map((file) => createFileThumbnail(`${folder}/${file}`));

            resolve(promises);
        });
    });
};

const createThumbnailsForFoldersList = (folders) => {
    return new Promise((resolve) => {
        Promise.all(folders.map(getFilePromises))
               .then((promiseList) => {
                    const allPromises = _.flatten(promiseList);

                    const queue = new PQueue({
                        concurrency: os.cpus().length,
                        autoStart: false,
                    });

                    allPromises.forEach((promise) => {
                        queue.add(() => promise);
                    });

                    queue.start()
                         .onIdle(resolve);
               });
    });
};

const createThumbnailsForFolder = (folder) => {
    return createThumbnailsForFoldersList([folder]);
};

export {
    createThumbnailsForFoldersList,
    createThumbnailsForFolder,
};
