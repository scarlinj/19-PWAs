const path = require('path');
const crypto = require("crypto");
const webpack = require("webpack");
const crypto_orig_createHash = crypto.createHash;
crypto.createHash = algorithm => crypto_orig_createHash(algorithm == "md4" ? "sha256" : algorithm);

module.exports = {
    // entry is where webpack looks to start building the module
    entry: './assets/js/script.js',
    // output used to tell webpack where files will go, what to name files 
    output: {
        // add hashFunction below to solve dependency issue
        // hashFunction: "xxhash64",
        path: path.resolve(__dirname, 'dist'),
        filename: 'main.bundle.js'
    },
    plugins: [
        new webpack.ProvidePlugin({
            $: "jquery",
            jQuery: "jquery"
        }),
    ],
    // mode is the environment that webpack uses - will have different features for different environments
    // development mode has hot reloading of webpack and debugging features
    mode: 'development',
};