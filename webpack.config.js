const path = require('path');
const webpack = require('webpack');
const es3ifyPlugin = require('es3ify-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
module.exports = {
    devtool: 'cheap-module-source-map',
    entry: {
        production: path.resolve(__dirname, './views/app.jsx'),
    },
    output: {
        path: path.resolve(__dirname, 'devtmp'),
        filename: 'js/[name].js',
        publicPath: '/',
        chunkFilename: 'js/[name].js',
    },
    resolve: {
        extensions: ['.js', '.json', '.jsx','.ts','.tsx'],
        alias: {
            '@':path.resolve(__dirname,'views'),
        },
    },
    module: {
        rules: [
            {
                test: /\.ts?$/,
                use: {
                    loader: 'ts-loader',
                },
                include: [path.resolve(__dirname, 'views')],
            },
            {
                test: /\.tsx?$/,
                use: {
                    loader: 'ts-loader',
                },
                include: [path.resolve(__dirname, 'views')],
            },
            {
                test: /\.jsx?$/,
                use: {
                    loader: 'babel-loader',
                    options: {
                       presets:['@babel/preset-env','@babel/preset-react',]
                    },
                },
                include: [path.resolve(__dirname, 'views')],
            },
            {
                test: /\.css$/,
                include: [path.resolve(__dirname, 'views')],
                use: ['style-loader', 'css-loade'],
            },
            { test: /\.less$/, exclude: /node_modules/,
                use: [
                    'style-loader',
                    {
                        loader:'css-loader',
                        options:{
                            modules:true,
                        }
                    },
                    {
                        loader: "less-loader",
                        options:{},
                    },
                ]
            },
            {
                test: /\.(eot|woff|woff2|ttf|svg|png|jpg|gif)$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 100,
                            name: 'asset/[name].[ext]',
                        },
                    },
                ],
            },
        ],
    },
    mode: 'development',
    plugins: [
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: path.resolve(__dirname, './views/index.ejs'),
            inject: 'body',
            hase: true,
            minify: {
                // 压缩HTML文件
                removeComments: false, // 移除HTML中的注释
                collapseWhitespace: false, // 删除空白符与换行符
            },
            chunks: ['production'],
        }),
        new CopyWebpackPlugin([
            {from: 'views/static', to: 'static'},
        ],),
    ],
    devServer: {
        port: 3012,
        static: path.join(__dirname, 'devtmp'),// 临时的打包目录（在内存中）
        historyApiFallback:true,// 启用历史API回退
        hot:true,
        open: true,
        proxy:{
            '/api':{
                target:'http://localhost:8080',
                changeOrigin:true,
                secure:false,
            }
        }
    }
};
