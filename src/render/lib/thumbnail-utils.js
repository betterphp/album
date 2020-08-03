import _ from "lodash";

const { remote } = window.require("electron");
const app = remote.app;
const path = remote.require("path");
const fs = remote.require("fs");
const mkdirp = remote.require("mkdirp");
const sharp = remote.require("sharp");
const { default: PQueue } = remote.require("p-queue");
const os = remote.require("os")

/**
 * Checks if a file should be handled
 *
 * @return {boolean}
 */
const isHandledFile = (name) => {
    // Extract the final fial extension
    const ext = name.toLowerCase().split(".").pop();

    // Do a simple check for jpeg files
    return ext === "jpg" || ext === "jpeg";
};

/**
 * Creates a thumbnail for a single file
 *
 * @return {Promise} A proise that resolves once the thumbnail file has been created
 */
const createFileThumbnail = (file) => {
    return new Promise((resolve, reject) => {
        // Work out the path to the thumbnail file
        const folder = path.dirname(file);
        const fileName = path.basename(file);
        const thumbFolder = `${folder}/.album/thumbnails`;
        const thumbFile = `${thumbFolder}/${fileName}`;

        // Create the thumnail folder if not already there
        mkdirp(thumbFolder).then(() => {
            // Load the image data
            sharp(file)
                // Resize the image to a large-ish size
                .resize({
                    width: 1000,
                    height: 750,
                    fit: "cover",
                })
                // Write the resized data to a thumbnail file
                .toFile(thumbFile, (err, info) => {
                    if (err) {
                        // Fail if there was an error
                        reject(err);
                    } else {
                        // Otherwise resolve
                        resolve();
                    }
                })
        });
    });
};

/**
 * Gets a list of thumbnail creation promises for the images in a folder
 *
 * @return {Promise[]}
 */
const getFilePromises = (folder) => {
    return new Promise((resolve) => {
        // Scan for all files in the folder
        fs.readdir(folder, {}, (err, result) => {
            const promises = result
                // Filter to files we want to handle
                .filter(isHandledFile)
                // Create a thumbnail cration promise for each file
               .map((file) => createFileThumbnail(`${folder}/${file}`));

            // Resolve with that list
            resolve(promises);
        });
    });
};

/**
 * Creates thumbnails for all handled files in a list of folders
 *
 * @return {Promise} A promise that resolves once all thumbnails have been created
 */
const createThumbnailsForFoldersList = (folders) => {
    return new Promise((resolve) => {
        // Get thumnail creation promises for all folders in the list
        Promise.all(folders.map(getFilePromises))
               .then((promiseList) => {
                    // Flatten that into a single list of promises
                    const allPromises = _.flatten(promiseList);

                    // Create a queue that should run as fast as the host machine can go
                    const queue = new PQueue({
                        concurrency: os.cpus().length,
                        autoStart: false,
                    });

                    // Add all of the thumbnail generation tasks to the queue
                    allPromises.forEach((promise) => {
                        queue.add(() => promise);
                    });

                    // Run all of the tasks and resolve once done
                    queue.start()
                         .onIdle(resolve);
               });
    });
};

/**
 * Creates thumbnails for all handled files in a single folder
 *
 * @return {Promise} A promise that resolves once the thumbnails have been created
 */
const createThumbnailsForFolder = (folder) => {
    return createThumbnailsForFoldersList([folder]);
};

export {
    createThumbnailsForFoldersList,
    createThumbnailsForFolder,
};
