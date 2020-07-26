import React from "react";
import { withConfigContext } from "render/context/config-context";

class SettingsPage extends React.Component {

    render () {
        const { managedPaths } = this.props.configContext;

        return (
            <div>
                <h1>Managed Paths</h1>
                <ol>
                    {managedPaths.map((path) => <li key={path}>{path}</li>)}
                </ol>
            </div>
        );
    }

}

export default withConfigContext(SettingsPage);
