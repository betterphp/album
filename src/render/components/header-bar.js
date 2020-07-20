import React from "react";
import { Link } from "react-router-dom";
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
                <Link to="/settings">Settings</Link>
            </div>
        );
    }

}

export default withConfigContext(HeaderBar);
