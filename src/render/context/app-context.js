import React from "react";

const AppContext = React.createContext({});

const withAppContext = (Component) => {
    return (props) => {
        return (
            <AppContext.Consumer>
                {(context) => (
                    <Component
                        {...props}
                        appContext={context}
                    />
                )}
            </AppContext.Consumer>
        );
    };
};

export { AppContext, withAppContext };
