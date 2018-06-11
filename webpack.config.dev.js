const HtmlWebpackPlugin = require('html-webpack-plugin')
const webpack=require('webpack')

module.exports={
    entry:"./src/main.js",
    module:{
        rules: [
            {
              test: /\.vue$/,
              use: 'vue-loader'
            },
            {
                test: /\.css$/,
                use: [ 'style-loader', 'css-loader']
              },
              {
                test: /\.(ttf|woff|eot|svg|jpg|png)$/,
                use: [
                  {
                    loader: 'url-loader',
                  }
                ]
              }
          ]
    },
    devServer:{
        overlay: true,
    },
    resolve:{
        extensions: [".vue", ".js",".json"]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template:"./template.html"
        }),
        new webpack.ProvidePlugin({
            $: "jquery",
            jQuery: "jquery"
          }),
      ]
}