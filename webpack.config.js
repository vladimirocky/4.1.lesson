const path = require('path')
const {CleanWebpackPlugin} = require('clean-webpack-plugin')
const HTMLWebpackPlugin = require('html-webpack-plugin')

module.exports = {
    entry:'.src/index.js',
    output: {
        filename: "bundle.js",
        path: path.resolve(__dirname,'dist')
    },
    plugins:[
        new HtmlWebpackPlugin({template:"./src/index/html"}),
        new CleanWebpackPlugin() 
    ]
}
module.exports = {
    module: {
      rules: [
  
        // Правило для CSS
        {
          test: /\.css$/,
          use: [
            {loader: 'style-loader'},
            {loader: 'css-loader'},
            {loader: 'sass-loader'}
          ]
        }
      ]
    }
  }
