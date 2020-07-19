import React from "react";
import ReactDOM from "react-dom";
import { MemoryRouter } from "react-router-dom";
import { AppContainer as ReactHotAppContainer } from "react-hot-loader";
import App from "./app";

import "../../node_modules/normalize.css/normalize.css";
import "./index.scss";

const AppContainer = (process.env.PLAIN_HMR)
    ? React.Fragment
    : ReactHotAppContainer;

const app = (
    <AppContainer>
        <MemoryRouter>
            <App />
        </MemoryRouter>
    </AppContainer>
);

ReactDOM.render(app, document.getElementById("root"));
