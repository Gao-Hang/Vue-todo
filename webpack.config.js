const path = require('path')
const webpack = require('webpack')
const HTMLPlugin = require('html-webpack-plugin')
const VueLoaderPlugin = require('vue-loader/lib/plugin')

// const ExtractPlugin = require('extract-text-webpack-plugin')
//const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin')

const isDev = process.env.NODE_ENV === 'development'

var config = {
    target: 'web',
    entry: path.join(__dirname, './src/index.js'),
    output: {
        path: path.join(__dirname, 'dist'),
        filename: 'boundle.[Hash:8].js',

    },
    plugins: [
        // make sure to include the plugin for the magic
        new VueLoaderPlugin(),
        new HTMLPlugin(),
        new webpack.DefinePlugin({
            'process_env': {
                NODE_ENV: isDev ? '"development"' : '"production"'
            }
        })
    ],
    module: {
        rules: [
            {
                test: /.vue$/,
                loader: 'vue-loader'
            },
            {
                test: /.jsx$/,
                loader: 'babel-loader'
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            },
            {
                test: /\.(styl|stylus)$/,
                use: [
                    'style-loader',
                    'css-loader',
                    {
                        loader: "postcss-loader",
                        options: {
                            sourceMap:true,
                        }
                    },
                    'stylus-loader'
                ]
            },

            {
                test: /\.(gif|jpg|jpeg|png|svg)/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 1024,
                            name: '[name]-gao.[ext]',
                        }
                    }
                ]
            }
        ]
    }

}

if (isDev) {

    config.devtool = '#cheap-module-eval-source-map'
    config.devServer = {
        port: 9001,
        host: '0.0.0.0',
        overlay: {
            error: true,
        },
        // open: true,
        // historyFallback: {},
        hot: true
    }
    // 热加载
    config.plugins.push(
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoEmitOnErrorsPlugin()
    )
}

module.exports = config