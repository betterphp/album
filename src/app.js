import React from "react";
import { ConfigContext } from "context/config-context";

import HeaderBar from "components/header-bar";

const { app } = window.require("electron").remote;
const fs = window.require("fs");
const path = window.require("path");

export default class App extends React.Component {

    /**
     * Creates an instance of the app component
     *
     * @param {object} props Input props
     */
    constructor (props) {
        super(props);

        this.state = {
            config: {
                managedPaths: [
                    app.getPath("pictures"),
                ],
            },
        };
    }

    /**
     * Loads the app config from the json file
     *
     * @return {void}
     */
    loadConfig () {
        const configFile = path.join(app.getPath("userData"), "config.json");

        fs.readFile(configFile, (err, data) => {
            // File not existing is expected, throw anything else
            if (err.code !== "ENOENT") {
                throw err;
            }

            const config = window.JSON.parse(data);

            this.setState({
                config,
            });
        });
    }

    /**
     * Called when the component is added to the DOM
     *
     * @return {void}
     */
    componentDidMount () {
        this.loadConfig();
    }

    /**
     * Renders the component
     *
     * @return {React.Component} The component
     */
    render () {
        return (
            <ConfigContext.Provider value={this.state.config}>
                <>
                    <HeaderBar />
                    <div>
                        <div>{app.getPath("userData")}</div>
                        <div>{app.getPath("pictures")}</div>
                    </div>
                </>
            </ConfigContext.Provider>
        );
    }

}
