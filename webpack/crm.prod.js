const path = require("path")
const webpack = require("webpack")


const HtmlWebPackPlugin = require("html-webpack-plugin")
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const TerserPlugin = require("terser-webpack-plugin")
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin")
const CompressionPlugin = require("compression-webpack-plugin")
const { CleanWebpackPlugin } = require("clean-webpack-plugin")



module.exports = {
    target: "web",
    mode: "production",
    entry: "./crm/index.js",
    output: {
        filename: "[name].[chunkhash].js",
        path: path.resolve(__dirname, "../build/crm"),
        publicPath: "/",
    },

    plugins: [
        new webpack.DefinePlugin({
            "process.env": {
                NODE_ENV: JSON.stringify("production"),
                BROWSER: JSON.stringify(true),
            },
        }),
        new CompressionPlugin(),
        new CleanWebpackPlugin(),
        new MiniCssExtractPlugin({
            filename: `[name].[contenthash].css`,
            chunkFilename: `[id].[contenthash].css`,
        }),
        new HtmlWebPackPlugin({
            template: "./crm/index.html",
        }),
    ],
    module: {
        rules: [
            {
                test: /\.css$/i,
                use: [MiniCssExtractPlugin.loader, "css-loader"],
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
    optimization: {
        splitChunks: {
            chunks: "all",
        },
        minimize: true,
        minimizer: [
            new CssMinimizerPlugin({
                minimizerOptions: {
                    preset: [
                        "default",
                        {
                            discardComments: { removeAll: true },
                        },
                    ],
                },
            }),
            new TerserPlugin({
                terserOptions: {
                    format: {
                        comments: false,
                    },
                },
                extractComments: false,
            }),
        ],
    },
    devtool: false,
}