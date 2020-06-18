const path = require('path');
const webpack = require('webpack'); 
const { VueLoaderPlugin } = require('vue-loader'); 
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin'); 
//去除无用css  
const PurifyCSS = require('purifycss-webpack')
const glob = require('glob-all')
let entryPage = process.env.ENTRY_PAGE;
console.log(entryPage)
module.exports = {
    mode: 'development',  //production || development
    devServer: {  
        hot: true,   //自动刷新
        proxy: {
            "/psmc": "http://127.dev.cnki.net",
            "/search": "http://127.dev.cnki.net",
            '/sso': {
                target: 'http://sso.dev.cnki.net/', 
                changeOrigin: true,     // target是域名的话，需要这个参数，
                // secure: false,          // 设置支持https协议的代理 
                pathRewrite: {'/sso' : '/api/api'}
            },
        }
    },
    entry: {
        myVideo: './src/index.js',
        // foot: './src/index.js',
        // topAndFoot:'./src/index.js',
        // login: './src/index.js',
        // memberTips: './src/memberTip.js'
    },
    output: {
        filename: '[name].js', 
        path: path.resolve(__dirname, 'dist'),
        libraryTarget: 'umd',  
    }, 
    resolve: {
        // 后缀自动补全
        extensions: ['.js', '.vue'],
        alias: {
          // vue官网有说明
          'vue$': 'vue/dist/vue.esm.js',
          'vue': 'vue/dist/vue.esm.js',
          // 定义@符号来指代src目录
          '@': path.resolve(__dirname, 'src'),
        }
      },
    plugins: [  
        // 清除无用 css
        new PurifyCSS({
            paths: glob.sync([
                // 要做 CSS Tree Shaking 的路径文件
                path.resolve(__dirname, './src/*.html'), // 请注意，我们同样需要对 html 文件进行 tree shaking
                path.resolve(__dirname, './src/components/feedBack/*.vue')
            ])
        }), 
        new HtmlWebpackPlugin({ 
            template: "./src/index.html",   //自动打包html并引入相关静态文件
            filename: "index.html", 
        }), 
        new VueLoaderPlugin(),
        new CleanWebpackPlugin(),
        new webpack.ProvidePlugin({
            'pluginsType': entryPage,           
        }),
    ],
    module: {
        rules: [
            {
                test: /\.vue$/,
                loader: 'vue-loader'
            },
            {
                test: /\.js$/, // 使用正则来匹配 js 文件
                exclude: /node_modules/, // 排除依赖包文件夹
                use: {
                    loader: 'babel-loader' // 使用 babel-loader
                }
            },
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    'css-loader',
                ]
            }, 
            // 图片资源规则
            {
                test: /\.(png|jpg|jpeg|gif|ogg|svg)$/i,
                loader: 'url-loader',
                options: { 
                    name (file) { 
                        return '[hash].[ext]';
                    },
                    // outputPath: '/search/feedback/img/'
                }
            },
            // 字体资源规则
            {
                test: /\.(eot|ttf|woff|woff2)$/i,
                loader: 'url-loader',
                options: {
                    name (file) { 
                        return '[hash].[ext]';
                    }, 
                }
            },
        ]
    },
    externals: {
        // 'element-ui': 'element-ui'
    },
};