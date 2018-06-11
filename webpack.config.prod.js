const HtmlWebpackPlugin = require('html-webpack-plugin')
const webpack=require('webpack')
const path=require('path')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const  ExtractTextPlugin = require("extract-text-webpack-plugin");
module.exports={
    // entry:"./src/main.js",
    entry:{
        axios:["axios"],
        jquery:["jquery"],
        quanjiatong:["vue","vue-router","vuex"],
        moment:["moment"],
        "v-distpicker":["v-distpicker"],
        "vue-lazyload":["vue-lazyload"],
        bundle:"./src/main.js"
    },
    output:{
        path:path.join(__dirname,"dist"),
        filename:'js/[name].js'
    },
    module:{
        rules: [
            {
              test: /\.vue$/,
              use: 'vue-loader'
            },
            {
                test: /\.css$/,
                use: ExtractTextPlugin.extract({
                  fallback: "style-loader",
                  use: {
                      loader:'css-loader',
                      options:{
                          minimize: true, //在抽取css的时候同时进行压缩
                          publicPath:'dist/css'
                      }
                  }
                })
              },
              {
                test: /\.(ttf|woff|eot|svg|jpg|png)$/,
                use: [
                  {
                    loader: 'url-loader',
                    options: {
                      limit: 300,//阀值，如果图片大于10Kb就抽离出来
                      name:"/static/img/[name]-[hash:8].[ext]"//将抽离出来的图片、文档放入static的img文件中，利用hash值进行保存，可以解决缓存问题
                    }
                  }
                ]
              },
              { test: /\.js$/, exclude: /node_modules/, loader: "babel-loader" }
          ]
    },
    // devServer:{
    //     overlay: true,
    // },
    resolve:{
        extensions: [".vue", ".js",".json"]
    },
    plugins: [
        new ExtractTextPlugin("css/styles-[hash:5].css"),  
        new CleanWebpackPlugin('dist'),
        new HtmlWebpackPlugin({
            template:"./template.html",
            minify: {
                removeComments: true, //去注释
                collapseWhitespace: true, //压缩空格
                // removeAttributeQuotes: true //去除属性引用
                // more options:
                // https://github.com/kangax/html-minifier#options-quick-reference
            }
        }),
        new webpack.ProvidePlugin({
            $: "jquery",
            jQuery: "jquery"
          }),
          new webpack.DefinePlugin({
            'process.env': {
              NODE_ENV: JSON.stringify('production')
            }
          }),
          new webpack.optimize.UglifyJsPlugin({
            compress: {
              warnings: false,
              drop_debugger: true,  
              drop_console: true
            },
            comments: false,        //  去掉注释
          }),
          new webpack.optimize.CommonsChunkPlugin({
            name: [
              "quanjiatong",
              "vue-lazyload",
              "v-distpicker",
              "moment",
              "jquery",
              "axios"
            ],
            // name: ['jquery', 'vue-moment','quanjiatong','axios','v-distpicker','vue-lazyload'],
            // filename: "vendor.js"
            // (给 chunk 一个不同的名字)
      
            minChunks: Infinity
            // (随着 entry chunk 越来越多，
            // 这个配置保证没其它的模块会打包进 vendor chunk)
          })
      ]
}