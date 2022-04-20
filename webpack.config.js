const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { GenerateSW } = require('workbox-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');

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
	plugins: [
		new GenerateSW({
			swDest: 'sw.js',
		
			
		}),
		new CopyPlugin({
			patterns: [
				{ from: './src/manifest.json', to: '' },
				{ from: './src/icon-192x192.png', to: '' },
				{ from: './src/icon-256x256.png', to: '' },
				{ from: './src/icon-384x384.png', to: '' },
				{ from: './src/icon-512x512.png', to: '' },
			],
		}),
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
				loader: 'raw-loader',
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
