import React from "react";
import { withConfigContext } from "render/context/config-context";

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
                    const paths = result.map((name) => `${folder}/${name}`);

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
            <ul>
                {this.state.files.map((file) => (
                    <li key={file}>
                        {file}
                    </li>
                ))}
            </ul>
        );
    }

}

export default withConfigContext(DashboardPage);
