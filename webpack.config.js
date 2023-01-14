const path = require("path");
const LodashModuleReplacementPlugin = require('lodash-webpack-plugin');
const webpack = require('webpack');


module.exports = {
    context: path.resolve(__dirname),
    devtool: "inline-source-map",
    entry: {
        main:{
            import: "./src/main.ts",
            dependOn: 'shared',
        },
        shared: 'lodash',        
    },    
    mode: "development",
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: "ts-loader",
                exclude: /node_modules/,
            },
        ],
    },
    output: {
        filename: "slib.[name].js",
        path: path.resolve(__dirname, "dist"),
    },
    resolve: {
        extensions: [".tsx", ".ts", ".jsx", ".js"],
    },
    plugins: [
        new LodashModuleReplacementPlugin(),
    ],
};
