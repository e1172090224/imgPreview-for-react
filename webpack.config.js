const path = require('path');
const HtmlWebpackPlugin = require("html-webpack-plugin");
const htmlWebpackPlugin = new HtmlWebpackPlugin({
  template: path.join(__dirname, "example/src/index.html"),
  filename: "./index.html"
});
module.exports = {
  entry: path.join(__dirname, "src/index.js"),
  mode: 'development',
  output: {
    filename: 'index.js',
    path: path.resolve(__dirname, 'dist'),
    libraryTarget: 'commonjs2',
  },
  target: 'web',
  devtool: 'inline-source-map',
  module: {
    rules: [{
      test: /\.(js|jsx)$/,
      use: "babel-loader",
      exclude: /node_modules/
    }, {
      test: /\.tsx?$/,
      use: [
        {
          loader: "ts-loader",
          options: {
            transpileOnly: true,
          }
        }
      ]
    },
    {
      test: /\.less$/,
      // 要使用多个loader处理用use
      use: ['style-loader', 'css-loader', 'less-loader']
    },
    {
      // 处理图片资源，但是问题：默认处理不了html中img图片
      test: /\.(jpg|png|gif)$/,
      // 使用一个loader
      // 下载 url-loader file-loader
      loader: 'url-loader',
      options: {
        // 图片大小小于8kb，就会被base64处理
        // 优点: 减少请求数量（减轻服务器压力）
        // 缺点：图片体积会更大（文件请求速度更慢）
        limit: 80 * 1024,
        // 问题：因为url-loader默认使用es6模块化解析，而html-loader引入图片是commonjs
        // 解析时会出问题：[object Module]
        // 解决：关闭url-loader的es6模块化，使用commonjs解析
        esModule: false,
        // 给图片进行重命名
        // [hash:10]取图片的hash的前10位
        // [ext]取文件原来扩展名
        name: '[hash:10].[ext]',
        //publicPath: '/dist/'
      },
      type: 'javascript/auto'
    },
    {
      test: /\.html$/,
      // 处理html文件的img图片（负责引入img，从而能被url-loader进行处理）
      loader: 'html-loader'
    }
    ]
  },
  plugins: [htmlWebpackPlugin],

  resolve: {
    extensions: [".js", ".ts", ".tsx"]
  },
  devServer: {
    port: 3002
  },

};