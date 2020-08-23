import React from "react";
import { withConfigContext } from "render/context/config-context";
import { isHandledFile } from "render/lib/thumbnail-utils";
import Image from "render/components/image";

import styles from "./dashboard-page.module.scss";

const fs = window.require("electron").remote.require("fs");

class DashboardPage extends React.Component {

    /**
     * Creates a new instance of the dashboard page
     *
     * @param {object} props Input data
     */
    constructor (props) {
        super(props);

        this.state = {
            files: [],
        };
    }

    /**
     * Called just after the component is added to the DOM
     *
     * @return {void}
     */
    componentDidMount () {
        this.updateImageFileList();
    }

    /**
     * Fetches a list of image files from the managed folders
     *
     * @return {void}
     */
    updateImageFileList = () => {
        this.setState({ files: [] }, () => {
            this.props.configContext.managedPaths.map((folder) => {
                fs.readdir(folder, {}, (err, result) => {
                    const paths = result.filter(isHandledFile)
                                        .map((name) => `${folder}/${name}`);

                    this.setState((prevState) => ({
                        files: [
                            ...prevState.files,
                            ...paths,
                        ],
                    }));
                });
            });
        });
    }

    /**
     * Render the contents of the dashboard page
     *
     * @return {React.Component}
     */
    render () {
        return (
            <div className={styles.container}>
                {this.state.files.map((file) => (
                    <div
                        key={file}
                        className={styles.image}
                    >
                        <Image file={file} />
                    </div>
                ))}
            </div>
        );
    }

}

export default withConfigContext(DashboardPage);
