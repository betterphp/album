import React from "react";

const ConfigContext = React.createContext({});

const withConfigContext = (Component) => {
    return (props) => {
        return (
            <ConfigContext.Consumer>
                {(context) => (
                    <Component
                        {...props}
                        configContext={context}
                    />
                )}
            </ConfigContext.Consumer>
        );
    };
};

export { ConfigContext, withConfigContext };
