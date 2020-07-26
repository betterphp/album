import React from "react";
import ReactDOM from "react-dom";
import { HashRouter } from "react-router-dom";
import { AppContainer as ReactHotAppContainer } from "react-hot-loader";
import App from "./app";

import "../../node_modules/normalize.css/normalize.css";
import "./index.scss";

const AppContainer = (process.env.PLAIN_HMR)
    ? React.Fragment
    : ReactHotAppContainer;

const app = (
    <AppContainer>
        <HashRouter>
            <App />
        </HashRouter>
    </AppContainer>
);

ReactDOM.render(app, document.getElementById("root"));
