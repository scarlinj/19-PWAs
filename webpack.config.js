const webpack = require("webpack");
const BundleAnalyzerPlugin = require("webpack-bundle-analyzer").BundleAnalyzerPlugin;
const path = require('path');
const WebpackPwaManifest = require("webpack-pwa-manifest");
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
        new WebpackPwaManifest({
            name: "Food Event",
            short_name: "Foodies",
            description: "An app that allows you to view upcoming food events.",
            start_url: "../index.html",
            background_color: "#01579b",
            theme_color: "#ffffff",
            // fingerprints tell webpack whether or not to generate unique fingerprints so that each time a new manifest generates, it adds a unique name to manifest
            fingerprints: false,
            // inject determines wheter the link to manifest.json is added to the HTML - we are not using fingerprints, so not using inject
            // we will hardcode the path to the manifest.json instead
            inject: false,
            icons: [{
                src: path.resolve("assets/img/icons/icon-512x512.png"),
                sizes: [96, 128, 192, 256, 384, 512],
                // destination tells where icons to be sent after creating web manifest
                destination: path.join("assets", "icons")
            }]
        }),
    ],
    // mode is the environment that webpack uses - will have different features for different environments
    // development mode has hot reloading of webpack and debugging features
    mode: 'development',

};

// Put the above module.export into a variable "config" and module.export that variable
module.exports = config;