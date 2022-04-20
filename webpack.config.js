const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');

module.exports = {
	mode: 'development',
	entry: {
		main: path.resolve(__dirname, './src/js/app.js'),
	},
	output: {
		path: path.resolve(__dirname, './dist'),
		filename: '[name].[contenthash].js',
	},
	devtool: 'source-map',
	devServer: {
		static: {
			directory: path.join(__dirname, './dist'),
		},
		compress: true,
		port: 9000,
		open: true,
		hot: true,
	},
	// optimization: {
	// 	minimizer: [
	// 		// For webpack@5 you can use the `...` syntax to extend existing minimizers (i.e. `terser-webpack-plugin`), uncomment the next line
	// 		// `...`,
	// 		new CssMinimizerPlugin(),
	// 	],
	// 	minimize: true,
	// },
	plugins: [
		new CleanWebpackPlugin(),
		new MiniCssExtractPlugin(),
		new HtmlWebpackPlugin({
			title: 'webpack toDoApp',
			template: path.resolve(__dirname, './src/index.html'), // template file
			filename: 'index.html', // output file
		}),
	],
	module: {
		rules: [
			// JavaScript
      {
        test: /\.html$/,
        loader: "raw-loader"
      },
			{
				test: /\.js$/,
				exclude: /node_modules/,
				use: ['babel-loader'],
			},
			{
				test: /\.css$/,
				use: [
					{
						loader: 'style-loader',
					},
					{
						loader: 'css-loader',
					},
				],
			},
		],
	},
};
