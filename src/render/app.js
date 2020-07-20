import React from "react";
import { Switch, Route } from "react-router-dom";
import { ConfigContext } from "render/context/config-context";
import DashboardPage from "render/pages/dashboard-page";
import SettingsPage from "render/pages/settings-page";

import HeaderBar from "render/components/header-bar";

const app = window.require("electron").remote.app;
const path = window.require("electron").remote.require("path");
const fs = window.require("electron").remote.require("fs");

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
                <HeaderBar />
                <main>
                    <Switch>
                        <Route exact path="/" component={DashboardPage} />
                        <Route path="/settings" component={SettingsPage} />
                    </Switch>
                </main>
            </ConfigContext.Provider>
        );
    }

}
