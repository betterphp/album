import React from "react";
import { Switch, Route } from "react-router-dom";
import { ConfigContext } from "render/context/config-context";
import { AppContext } from "render/context/app-context";
import DashboardPage from "render/pages/dashboard-page";
import SettingsPage from "render/pages/settings-page";
import { loadConfigFile, saveConfigFile } from "render/lib/config-manager";
import { createThumbnailsForFoldersList } from "render/lib/thumbnail-utils";

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
     * Called when the component is added to the DOM
     *
     * @return {void}
     */
    componentDidMount () {
        this.loadConfig(this.createThumbnails);
    }

    /**
     * Generates thumbnails for all images in all managed folders
     *
     * @return {void}
     */
    createThumbnails = () => {
        this.setState(
            { generatingThumbnails: true },
            () => {
                const folders = this.state.config.managedPaths;

                createThumbnailsForFoldersList(folders).then(() => {
                    this.setState({
                        generatingThumbnails: false,
                    });
                });
            }
        );
    }

    /**
     * Loads the app config from the json file
     *
     * @param {function} callback Optional function to call once the config has been loaded
     *
     * @return {void}
     */
    loadConfig = (callback = undefined) => {
        loadConfigFile().then((config) => {
            this.setState({
                loaded: true,
                config,
            }, () => {
                if (callback) {
                    callback();
                }
            });
        });
    }

    /**
     * Saves the app config to the json file
     *
     * @return {void}
     */
    saveConfig = () => {
        saveConfigFile(this.state.config)
            .then(() => this.loadConfig());
    }

    /**
     * Updates the global app config
     *
     * @param {object} newConfig The new config, this replaced all existing config
     * @param {function} callback A function to call after setting the state
     *
     * @return {void}
     */
    setConfig = (config, callback) => {
        this.setState({ config }, callback);
    }

    /**
     * Appends to the global app state.
     * 
     * @param {object} newConfig The new config, this is merged with existing config
     * @param {function} callback A function to call after setting the state
     *
     * @return {void}
     */
    ammendConfig = (newConfig, callback) => {
        console.log(newConfig);

        this.setState(
            (prevState) => ({
                config: {
                    ...prevState.config,
                    ...newConfig,
                },
            }),
            callback
        );
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
            ammendConfig: this.ammendConfig,
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
