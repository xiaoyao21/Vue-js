//开发环境

const path = require('path')

//默认的配置文件
module.exports = {
    entry: './src/index.js', //定义入口
    mode: 'development', //模式
    output: {
        filename: 'main.js',
        path: path.resolve(__dirname, 'dist') //将相对路径转化为绝对路径
    },
    module: {
        rules: [{
            test: /\.(sc|c|sa)ss$/, //遇到这种后缀 用下面两种loader处理(从右向左处理)
            use: [
                loader: "style-loader", {
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
    }
}

