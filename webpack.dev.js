const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const merge = require('webpack-merge');
const common = require('./webpack.common');
const sections = require('./sections');

module.exports = merge(common, {
    mode: 'development',
    devServer: {
        index: `${sections[sections.length-1]}.html`,
        filename: `js/${sections[sections.length-1]}.js`
    },
    plugins: [],
    module: {
        rules: [
            {
                test: /\.s[ac]ss$/i,
                use: [
                    // Creates `style` nodes from JS strings
                    'style-loader',
                    // Translates CSS into CommonJS
                    'css-loader',
                    // Compiles Sass to CSS
                    'sass-loader',
                ],
            },
        ]
    }
});

sections.forEach(section => module.exports.plugins.push(
    new HtmlWebpackPlugin({
        filename: `${section}.html`,
        template: `./src/${section}.html`,
        chunks: [`${section}`]
    })
));