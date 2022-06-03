const path = require('path')
const mode = 'development'

module.exports = {
   mode: mode,
   entry: "./src/index.js",
   output: {
      filename: "boundle.js",
      path: path.resolve(__dirname, 'dist'),
      clean: true,
   },
   module: {
      rules: [
         {
            test: /\.html$/i,
            loader: "html-loader"
         },
         {
            test: /\.svg$/,
            loader: 'icons-loader',
         },
         {
            test: /\.(sa|sc|c)ss$/i,
            use: [
              // Creates `style` nodes from JS strings
              "style-loader",
              // Translates CSS into CommonJS
              "css-loader",
              // Compiles Sass to CSS
              "sass-loader",
            ],
          },
      ]
   }
}