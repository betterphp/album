import React from "react";

import styles from "./image.module.scss";

const { remote } = window.require("electron");
const app = remote.app;
const path = remote.require("path");

export default class Image extends React.Component {

    render () {
        const { file } = this.props;

        const folder = path.dirname(file);
        const fileName = path.basename(file);
        const thumbFolder = `${folder}/.album/thumbnails`;
        const thumbFile = `${thumbFolder}/${fileName}`;

        return (
            <img
                className={styles.image}
                src={`file://${thumbFile}`}
                alt=""
            />
        );
    }

}
