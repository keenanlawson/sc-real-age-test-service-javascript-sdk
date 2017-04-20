const path = require('path');
const webpack = require('webpack');

module.exports = {
    context: __dirname,
    entry: [
        './ProviderSearchServiceSDK.js'
    ],
    output: {
        path: path.join(__dirname, 'dist'),
        filename: 'ProviderSearchServiceSDK.js',
        libraryTarget: 'var',
        library: ['com', 'package', 'Sharecare', 'ProviderSearchServiceSDK']
    },
    plugins: [
        new webpack.optimize.DedupePlugin(),
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            }
        })
    ]
};
