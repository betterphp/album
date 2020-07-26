import React from "react";
import { withAppContext } from "render/context/app-context";
import { withConfigContext } from "render/context/config-context";

const { dialog } = require("electron").remote;

class ManagedPaths extends React.Component {

    /**
     * Called when the remove button next to a path is clicked
     *
     * @param {string} path The path being removed
     *
     * @return {void}
     */
    handleRemoveButtonClick = (path) => {
        const existingPaths = this.props.configContext.managedPaths;

        const newPaths = existingPaths.filter(
            (existingPath) => existingPath !== path
        );

        this.props.appContext.ammendConfig({
            managedPaths: newPaths,
        }, () => {
            this.props.appContext.saveConfig();
        });
    }

    /**
     * Called when the add button is clicked
     *
     * @return {void}
     */
    handleAddButtonClick = () => {
        dialog.showOpenDialog({
            properties: [
                "openDirectory",
                "multiSelections",
            ],
        }).then((result) => {
            if (result.cancelled) {
                return;
            }

            const { managedPaths } = this.props.configContext;
            const newPaths = [
                ...managedPaths,
                ...result.filePaths,
            ];

            this.props.appContext.ammendConfig({
                managedPaths: newPaths,
            }, () => {
                this.props.appContext.saveConfig();
            });
        });
    }

    /**
     * Renders the settings component contents
     *
     * @return {React.Component}
     */
    render () {
        const { managedPaths } = this.props.configContext;

        return (
            <div>
                <h1>Managed Paths</h1>
                <ol>
                    {managedPaths.map((path) => (
                        <li key={path}>
                            <span>{path}</span>
                            <button
                                type="button"
                                onClick={() => this.handleRemoveButtonClick(path)}
                            >
                                Remove
                            </button>
                        </li>
                    ))}
                </ol>
                <button
                    type="button"
                    onClick={this.handleAddButtonClick}
                >
                    Add
                </button>
            </div>
        );
    }

}

export default withAppContext(withConfigContext(ManagedPaths));
