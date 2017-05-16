const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const glob = require("glob");

//自动添加示例页面
let htmlWebpackPluginArr = [];
let htmlEntrys = {};

if (process.env.NODE_ENV.indexOf("product") >= 0) {
    console.log(">>>>>>>>>>>start product package");

    let files = glob.sync("./src/example/*.html", {});
    if (files) {
        files.forEach(file => {
            let fileName = file.substr(file.lastIndexOf("/") + 1).replace(".html", "");
            htmlEntrys[fileName] = `./src/example/${fileName}.js`;
            htmlWebpackPluginArr.push(
                new HtmlWebpackPlugin({
                    filename: `${fileName}.html`, //输出的html文件
                    template: `./src/example/${fileName}.html`, //模板html,在此基础上添加js
                    chunks: [fileName]
                })
            );
        });
    }
} else {
    console.log(">>>>>>>>>>>start development package");
    htmlWebpackPluginArr.push(
        new HtmlWebpackPlugin({
            filename: 'example_path.html',
            template: './src/example/example_path.html',
            chunks: ['example_path']
        })
    );
    htmlEntrys['example_path'] = './src/example/example_path.js';
}

module.exports = {
    entry: Object.assign({
            index: "./src/index.js"
        },
        htmlEntrys
    ),
    output: {
        path: path.resolve(__dirname, "dist"), //输出目录
        filename: "[name].[hash].js"
    },
    module: {
        loaders: [{
                test: /\.js$/,
                exclude: /node_modules/, //排除路径
                loader: "babel-loader" //使用babel转码ES6
            },
            {
                test: /\.(png|jpg)$/,
                loader: "url-loader?limit=8192" //8192byte内的小图片,直接以base64引入页面
            }
        ]
    },
    devtool: "#cheap-module-eval-source-map",
    plugins: htmlWebpackPluginArr.concat([
        new HtmlWebpackPlugin({
            filename: "index.html", //输出的html文件
            template: "./src/index.html", //模板html,在此基础上添加js
            chunks: ["index"]
        }),
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            }
        })
    ]),
    devServer: {
        inline: true,
        watchOptions: {
            aggregateTimeout: 300,
            poll: 1000
        },
        host: "0.0.0.0",
        historyApiFallback: true
    }
};