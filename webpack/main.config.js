const webpack = require("webpack");
const path = require("path");

module.exports = {
    mode: (process.env.NODE_ENV === "development") ? "development" : "production",
    target: "electron-main",
    entry: path.join(__dirname, "../src/main/main.js"),
    output: {
        path: path.join(__dirname, "../build"),
        filename: "main.min.js",
        libraryTarget: "commonjs2",
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                use: ["babel-loader"],
                exclude: [/node_modules/],
            },
            {
                test: /\.node$/,
                parser: { amd: false },
                use: {
                    loader: "@marshallofsound/webpack-asset-relocator-loader",
                    options: {
                        outputAssetBase: "native_modules",
                    },
                },
            },
        ],
    },
    node: {
        __diename: false,
        __filename: false,
    },
    optimization: {
        minimize: false,
    },
    plugins: [
        new webpack.optimize.LimitChunkCountPlugin({ maxChunks: 1 }),
        new webpack.DefinePlugin({
            "process.env.NODE_ENV": JSON.stringify(process.env.NODE_ENV),
            "process.env.PRODUCT_NAME": JSON.stringify(process.env.npm_package_productName),
            "process.env.DEV_SERVER_PORT": JSON.stringify(process.env.npm_package_dev_dev_server_port),
        }),
    ],
};

