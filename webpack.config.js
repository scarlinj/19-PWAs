const webpack = require("webpack");
const BundleAnalyzerPlugin = require("webpack-bundle-analyzer").BundleAnalyzerPlugin;
const path = require('path');
// const crypto = require("crypto");

// const crypto_orig_createHash = crypto.createHash;
// crypto.createHash = algorithm => crypto_orig_createHash(algorithm == "md4" ? "sha256" : algorithm);

const config = {
    // entry is where webpack looks to start building the module
    entry: {
        app: './assets/js/script.js',
        events: './assets/js/events.js',
        schedule: './assets/js/schedule.js',
        tickets: './assets/js/tickets.js',
    },
    // output used to tell webpack where files will go, what to name files 
    output: {
        // add hashFunction below to solve dependency issue
        // hashFunction: "xxhash64",
        // in output, type filename: '[name].bundle.js'
        // filename: 'app.bundle.js',
        // filename: 'events.bundle.js',
        // filename: 'schedule.bundle.js',
        // filename: 'tickets.bundle.js',
        filename: '[name].bundle.js',
        // this will name the respective files the below:
        // 'app.bundle.js',
        // 'events.bundle.js',
        // 'schedule.bundle.js',
        // 'tickets.bundle.js',
        path: path.resolve(__dirname, '/dist'),

    },
    module: {
        rules: [{
            // looking for jpg files - can change the below to add .png, .svg, etc.
            test: /\.(jpe?g|png|gif)$/i,
            use: [{
                loader: 'file-loader',
                options: {
                    esModule: false,
                    name(file) {
                        return "[path][name].[ext]"
                    },
                    publicPath: function (url) {
                        return url.replace("../", "/assets/")
                    },
                }
            }]
        }]
    },
    plugins: [
        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery',
        }),
        new BundleAnalyzerPlugin({
            analyzerMode: 'static', // the report outputs to an HTML file called "report.html" in the dist folder - set value to"disable" to prevent automatically opening document
        }),

    ],
    // mode is the environment that webpack uses - will have different features for different environments
    // development mode has hot reloading of webpack and debugging features
    mode: 'development',

};

// Put the above module.export into a variable "config" and module.export that variable
module.exports = config;