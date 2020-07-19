const webpack = require("webpack");
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

const getStyleLoaders = (cssLoaderOptions) => ([
    {
        loader: "style-loader",
    },
    {
        loader: "css-loader",
        options: cssLoaderOptions,
    },
    {
        loader: "postcss-loader",
        options: {
            ident: "postcss",
            plugins: () => [
                require("postcss-flexbugs-fixes"),
                require("postcss-preset-env")({
                    autoprefixer: {
                        flexbox: "no-2009",
                    },
                    stage: 3,
                }),
            ],
        },
    },
    {
        loader: "sass-loader",
    },
]);

module.exports = {
    target: "electron-renderer",
    module: {
        rules: [
            {
                oneOf: [
                    {
                        test: /\.js$/,
                        use: ["babel-loader"],
                        exclude: [/node_modules/],
                    },
                    {
                        test: /\.(scss|css)$/,
                        exclude: /\.module\.(scss|css)$/,
                        use: getStyleLoaders({
                            modules: false,
                        }),
                    },
                    {
                        test: /\.module\.(scss|css)$/,
                        use: getStyleLoaders({
                            modules: {
                                localIdentName: "[name]_[local]__[hash:base64]",
                            },
                        }),
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
                    {
                        /*
                         * The file-loader is used as a fallback, any new loaders should be added above this one.
                         */
                        exclude: [/\.js$/, /\.html$/, /\.json$/],
                        loader: "file-loader",
                        options: {
                            name: "static/media/[name].[hash:8].[ext]",
                        },
                    },
                ],
            },
        ],
    },
    resolve: {
        modules: [
            "node_modules",
            path.resolve(__dirname, "../src"),
        ],
        alias: {
            "react-hot-loader": path.resolve(path.join(__dirname, "../node_modules/react-hot-loader")),
            "react": path.resolve(path.join(__dirname, "../node_modules/react")),
            "react-dom": path.resolve(path.join(__dirname, "../node_modules/@hot-loader/react-dom")),
        },
    },
    node: {
        __dirname: false,
        __filename: false,
    },
    optimization: {
        minimize: false,
    },
    plugins: [
        new webpack.optimize.LimitChunkCountPlugin({ maxChunks: 1 }),
        new HtmlWebpackPlugin({
            title: "",
            filename: "index.html",
            template: path.join(__dirname, "../src/render/index.html"),
        }),
        new webpack.DefinePlugin({
            "process.env.NODE_ENV": JSON.stringify(process.env.NODE_ENV),
            "process.end.PRODUCT_NAME": JSON.stringify(process.env.npm_package_productName),
        }),
    ],
};
