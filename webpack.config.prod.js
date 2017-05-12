const path = require('path');
const webpack = require('webpack');

module.exports = {
    target: 'node',
    entry: [
        './sdk/RealAgeTestServiceSDK.js'
    ],
    output: {
        path: path.join(__dirname, 'dist'),
        filename: 'RealAgeTestServiceSDK.js',
        libraryTarget: 'umd',
        library: 'RealAgeTestServiceSDK'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: [/(node_modules)/],
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['env']
                    }
                }
            }
        ]
    },
    plugins: [
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false,
                drop_console: false,
            }
        })
    ]
};
