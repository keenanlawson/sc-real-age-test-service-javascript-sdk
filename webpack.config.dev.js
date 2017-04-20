const path = require('path');
const webpack = require('webpack');

module.exports = {
    entry: [
        './sdk/RealAgeTestServiceSDK.js'
    ],
    output: {
        path: path.join(__dirname, 'build'),
        filename: 'RealAgeTestServiceSDK.js',
        libraryTarget: 'umd',
        library: ['com', 'package', 'Sharecare', 'RealAgeTestServiceSDK']
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
    }
};
