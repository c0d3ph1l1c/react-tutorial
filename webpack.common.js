const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin');
const TerserWebpackPlugin = require('terser-webpack-plugin');
const sections = require('./sections');

module.exports = {
    entry: {},
    module: {
        rules: [
            {
                test: /\.m?js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: [
                            '@babel/preset-env', 
                            '@babel/preset-react',
                        ],
                        plugins: [
                            '@babel/plugin-proposal-class-properties',
                        ]
                    }
                }
            },
            {
                test: /\.(png|jpe?g|gif)$/i,
                use: [{
                    loader: 'file-loader',
                }, ],
            },
            {
                test: /\.(html)$/,
                use: {
                    loader: 'html-loader',
                    options: {
                        attrs: [':data-src']
                    }
                }
            }
        ]
    }
}

sections.forEach(section => module.exports.entry[section] = `./src/js/${section}.js`);