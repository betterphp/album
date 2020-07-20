import React from "react";
import { withConfigContext } from "render/context/config-context";

class SettingsPage extends React.Component {

    render () {
        return (
            <div>
                {JSON.stringify(this.props.configContext, null, 4)}
            </div>
        );
    }

}

export default withConfigContext(SettingsPage);
