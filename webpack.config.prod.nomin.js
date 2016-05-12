var path = require('path');

module.exports = {
    entry: {
        index: './src/angular-number-picker.js'
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'angular-number-picker.js',
        libraryTarget: 'umd'
    },
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
