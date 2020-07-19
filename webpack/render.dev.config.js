const webpack = require("webpack");
const { merge } = require("webpack-merge");
const path = require("path");
const baseConfig = require("./render.base.config.js");
const pkg = require("../package.json");

const PORT = pkg.dev["dev-server-port"];

module.exports = merge(baseConfig, {
    mode: "development",
    devtool: "source-map",
    entry: [
        `webpack-dev-server/client?http://localhost:${PORT}`,
        "webpack/hot/only-dev-server",
        "./src/render/index.js",
    ],
    output: {
        path: path.join(__dirname, "../build"),
        filename: "render.dev.js",
    },
    devServer: {
        host: "localhost",
        port: PORT,
        hot: true,
        publicPath: "/",
        disableHostCheck: true,
    },
});
