const path = require("path")
const HtmlWebPackPlugin = require("html-webpack-plugin")
const webpack = require("webpack")



module.exports = {
    target: "web",
    mode: "development",
    entry: "./site/index.js",
    output: {
        filename: "bundle.js",
        path: path.resolve(__dirname, "public"),
        publicPath: "/",
    },
    module: {
        rules: [
            {
                test: /\.css$/i,
                use: ["style-loader", "css-loader"],
            },
            {
                test: /\.js?$/,
                exclude: /node_modules/,
                use: ["babel-loader"],
            },
            {
                test: /\.(png|jpe?g|gif)$/i,
                use: ["file-loader"],
            },
        ],
    },
    plugins: [
        new HtmlWebPackPlugin({
            template: "./site/index.html",
        }),
        new webpack.HotModuleReplacementPlugin(),

        new webpack.DefinePlugin({
            "process.env": {
                NODE_ENV: JSON.stringify("development"),
                BROWSER: JSON.stringify(true),
            },
        }),
        
    ],
    devServer: {
        static: "./public",
        port: 3001,
        open: true,
        historyApiFallback: true,
    },
    devtool: "inline-source-map",
}
