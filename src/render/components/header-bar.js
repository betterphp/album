import React from "react";
import { withConfigContext } from "render/context/config-context";

import styles from "./header-bar.module.scss";

class HeaderBar extends React.Component {

    /**
     * Renders the main app header bar
     *
     * @return {React.Component} The component
     */
    render () {
        return (
            <div className={styles.container}>
                {this.props.configContext.managedPaths[0]}
            </div>
        );
    }

}

export default withConfigContext(HeaderBar);
