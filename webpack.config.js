const path = require('path');
const HtmlWebpackPlugin = require("html-webpack-plugin");
const htmlWebpackPlugin = new HtmlWebpackPlugin({
 template: path.join(__dirname, "example/src/index.html"),
 filename: "./index.html"
});
module.exports = {
 entry: path.join(__dirname, "example/src/index.tsx"),
 module: {
   rules: [{
     test: /\.(js|jsx)$/,
   use: "babel-loader",
   exclude: /node_modules/
 }, {
    test: /\.tsx?$/,
    use: [
        {
            loader: "ts-loader"
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
}};