
'use strict'

const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = {
    devServer: {
        host: '0.0.0.0',
        port: 7074,
        // inline: true,
        // disableHostCheck: true,
        historyApiFallback: true,
    },
    entry: {
        index: {
            import: './src/App.tsx',
            dependOn: 'shared',
        },
        shared: ['react', 'react-dom', 'react-router-dom'],
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './public/index.html',
            // favicon: './public/favicon.ico',
        }),
        // new BundleAnalyzerPlugin(),
    ],
    resolve: {
        extensions: ['.js','.jsx', '.ts', '.tsx'],
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                loader: 'ts-loader',
            },
            // {
            //     test: /\.css$/,
            //     use: ['style-loader', 'css-loader'],                  
            // },
            {
                test: /\.css$/,
                use: [
                  "style-loader",
                  {
                    loader: "css-loader",
                    options: {
                        modules: {
                            localIdentName: '[name]__[local]--[hash:base64:5]'
                        }
                    }
                  },
                ],
            },
            {
                test: /\.(jpg|png)$/,
                use: 'file-loader',
            },
        ],
    },
    optimization: {
        splitChunks: {
            chunks: 'all',
        },
    },
    output: {
        filename: 'assets/[name].' + (new Date()).getTime() + '.js',
    },
}
