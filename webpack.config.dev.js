var path = require('path');

module.exports = {
    entry: {
        index: './src/angular-number-picker.js'
    },
    output: {
        path: path.resolve(__dirname, 'demo'),
        filename: 'angular-number-picker.js',
        libraryTarget: 'umd'
    },
    debug: true,
    devtool: 'source-map',
    module: {
        loaders: [
            {
                test: /\.js$/,
                loader: 'babel?{"presets":["es2015"]}',
                exclude: /(node_modules)/
            }
        ]
    },
    externals: {
        angular: 'angular'
    }
};
