import React from "react";
import { Switch, Route } from "react-router-dom";
import { ConfigContext } from "render/context/config-context";
import { AppContext } from "render/context/app-context";
import DashboardPage from "render/pages/dashboard-page";
import SettingsPage from "render/pages/settings-page";
import { loadConfigFile, saveConfigFile } from "render/lib/config-manager";

import HeaderBar from "render/components/header-bar";

export default class App extends React.Component {

    /**
     * Creates an instance of the app component
     *
     * @param {object} props Input props
     */
    constructor (props) {
        super(props);

        this.state = {
            loaded: false,
            config: null,
        };
    }

    /**
     * Loads the app config from the json file
     *
     * @return {void}
     */
    loadConfig = () => {
        loadConfigFile().then((config) => {
            this.setState({
                loaded: true,
                config,
            });
        });
    }

    /**
     * Saves the app config to the json file
     *
     * @return {void}
     */
    saveConfig = () => {
        saveConfigFile().then(() => this.loadConfig());
    }

    /**
     * Updates the global app config
     *
     * @return {void}
     */
    setConfig = (config) => {
        this.setState({ config });
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
     * Renders the main app content
     *
     * @return {React.Component}
     */
    renderApp () {
        return (
            <>
                <HeaderBar />
                <main>
                    <Switch>
                        <Route exact path="/" component={DashboardPage} />
                        <Route path="/settings" component={SettingsPage} />
                    </Switch>
                </main>
            </>
        );
    }

    /**
     * Renders the component
     *
     * @return {React.Component} The component
     */
    render () {
        if (!this.state.loaded) {
            return <div>Loading</div>;
        }

        const appContext = {
            loadConfig: this.loadConfig,
            saveConfig: this.saveConfig,
            setConfig: this.setConfig,
        };

        return (
            <AppContext.Provider value={appContext}>
                <ConfigContext.Provider value={this.state.config}>
                    {this.renderApp()}
                </ConfigContext.Provider>
            </AppContext.Provider>
        );
    }

}
