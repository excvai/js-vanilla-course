const path = require('path');
const webpack = require('webpack');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const isProd = process.env.NODE_ENV === 'production';
const isDev = !isProd;

const fileName = ext => (isDev ? `bundle.${ext}` : `bundle.[hash].${ext}`);

const jsLoaders = () => {
	const loaders = ['babel-loader'];

	if (isDev) {
		loaders.push('eslint-loader');
	}

	return loaders;
};

module.exports = {
	context: path.resolve(__dirname, 'src'),
	mode: 'development',
	entry: ['@babel/polyfill', './index.js'],
	output: {
		filename: fileName('js'),
		path: path.resolve(__dirname, 'dist'),
	},
	resolve: {
		extensions: ['.js'],
		alias: {
			'@': path.resolve(__dirname, 'src'),
			'@core': path.resolve(__dirname, 'src/core'),
		},
	},
	devtool: isDev ? 'source-map' : false,
	devServer: {
		port: 3000,
		hot: isDev,
		disableHostCheck: true,
	},
	target: 'web',
	plugins: [
		new CleanWebpackPlugin(),
		new HTMLWebpackPlugin({
			template: 'index.html',
			minify: {
				removeComments: isProd,
				collapseWhitespace: isProd,
			},
		}),
		new CopyPlugin({
			patterns: [
				{
					from: path.resolve(
						__dirname,
						'src/assets/icons/favicon.ico'
					),
					to: path.resolve(__dirname, 'dist/assets/icons'),
				},
			],
		}),
		new MiniCssExtractPlugin({
			filename: fileName('css'),
		}),
		// eslint-disable-next-line no-undef
		new webpack.DefinePlugin({
			'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
		}),
	],
	module: {
		rules: [
			{
				test: /\.s[ac]ss$/i,
				use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],
			},
			{
				test: /\.m?js$/,
				exclude: /(node_modules|bower_components)/,
				use: jsLoaders(),
			},
		],
	},
};
