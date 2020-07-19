const webpack = require("webpack");
const { merge } = require("webpack-merge");
const path = require("path");
const baseConfig = require("./render.base.config.js");

module.exports = merge(baseConfig, {
    mode: "production",
    devtool: false,
    entry: [
        "./src/render/index.js",
    ],
    output: {
        path: path.join(__dirname, "../build"),
        filename: "render.prod.js",
    },
});
