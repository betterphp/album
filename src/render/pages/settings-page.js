import React from "react";
import { withConfigContext } from "render/context/config-context";
import { withAppContext } from "render/context/app-context";

class SettingsPage extends React.Component {

    handleRemovePath = (path) => {
        const { managedPaths } = this.props.configContext;

        const newPaths = managedPaths.filter((existingPath) => existingPath !== path);

        this.props.appContext.setConfig({
            ...this.props.configContext,
            managedPaths: newPaths,
        }, () => {
            this.props.appContext.saveConfig();
        });
    }

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
                                onClick={() => this.handleRemovePath(path)}
                            >
                                Remove
                            </button>
                        </li>
                    ))}
                </ol>
            </div>
        );
    }

}

export default withAppContext(withConfigContext(SettingsPage));
