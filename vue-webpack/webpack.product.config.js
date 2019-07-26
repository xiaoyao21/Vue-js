//生产环境
const path = require('path')
const MiniCssExtractPlugin = require('mini-css-extract-plugin'); //样式表抽离 替换style-loader(style-loader 是将css注入到style标签内部，而MiniCssExtractPlugin，是将css抽离为一个.css文件)
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin'); //css压缩
const UglifyJsPlugin = require('uglifyjs-webpack-plugin'); //js压缩
const HtmlWebpackPlugin = require('html-webpack-plugin'); //解决hash值对应文件名找不到 直接将打包好的内容插入到html中
//const CleanWebpackPlugin = require('clean-webpack-plugin');  //清空dist目录


//默认的配置文件
module.exports = {
        entry: './src/index.js', //定义入口
        mode: 'production', //模式
        output: {
            filename: 'main.[hash].js', //加上[hash] 相当于生成一个加上一个标识符-版本号的js文件
            path: path.resolve(__dirname, 'dist') //将相对路径转化为绝对路径
        },
        module: {
            rules: [{
                test: /\.(sc|c|sa)ss$/, //遇到这种后缀 用下面两种loader处理(从右向左处理)
                use: [
                    MiniCssExtractPlugin.loader, {
                        loader: "css-loader",
                        options: {
                            sourceMap: true //启用sourceMap  可以显示css代码的来源及所在行数  便于调试
                        }
                    }, {
                        loader: "sass-loader",
                        options: {
                            sourceMap: true
                        }
                    }, {
                        loader: 'postcss-loader',
                        options: {
                            ident: 'postcss',
                            sourceMap: true,
                            plugins: (loader) => [
                                require('autoprefixer')({
                                    browsers: ['> 0.15% in CN'] //autoprefixer 可以设置浏览器的版本  （在特殊属性前面加上浏览器自己的标识display: -webkit-box;display: flex;）
                                })
                            ]
                        }
                    }
                ]
            }]
        },
        plugins: [ //定义一个插件
            new MiniCssExtractPlugin({
                    filename: '[name].css', // 设置最终输出的文件名
                    chunkFilename: '[id].css'
                }),
                new HtmlWebpackPlugin({ ////解决hash 带来的无法匹配到文件名的问题  eg：在生成的html中script标签的引入为 <.. src=main.f3ac487a15e224aef06c.js ..>
                    title: 'webpack 配置的小demo', // 默认值：Webpack App
                    filename: 'main.html', // 默认值： 'index.html'
                    template: path.resolve(__dirname, 'src/main.html'),
                    minify: {
                        collapseWhitespace: true,  //是否折叠空白
                        removeComments: true,  //是否移除
                        removeAttributeQuotes: true // 移除属性的引号
                    }
                })
                //,new CleanWebpackPlugin(['dist'])  //调用清空dist的这个插件
            ],
            optimization: { //压缩的配置   css压缩插件&js压缩插件
                minimizer: [
                    new OptimizeCSSAssetsPlugin({}), //css压缩插件
                    new UglifyJsPlugin({ //js压缩插件
                        cache: true,
                        parallel: true,
                        sourceMap: true // set to true if you want JS source maps
                    })
                ]
            }
        }
