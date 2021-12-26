const path = require('path');
const HtmlWebpackPlugin = require("html-webpack-plugin");
const htmlWebpackPlugin = new HtmlWebpackPlugin({
 template: path.join(__dirname, "example/src/index.html"),
 filename: "./index.html"
});
module.exports = {
 entry: path.join(__dirname, "src/index.tsx"),
 output: {
  filename: 'index.js',
  path: path.resolve(__dirname, 'dist'),
  libraryTarget: 'commonjs2',
},
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
            options:{
              transpileOnly: true,	
            }
        }
    ]
},{
   test: /\.(css|less)$/,
   use: ["style-loader", "css-loader","less-loader"]
 }]
},
 plugins: [htmlWebpackPlugin],
 
 resolve: {
   extensions: [".js",".ts",".tsx"]
 },
 devServer: {
   port: 3001
},

};