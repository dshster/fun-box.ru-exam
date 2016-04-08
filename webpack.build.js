var path = require('path');
var Webpack = require('webpack');
var WebpackExtractTextPlugin = require('extract-text-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = function buildWebpackConfig(options) {
	const TEST = 'test' === options.process;
	const BUILD = 'build' === options.process;
	const PRODUCTION = !!options.environment;

	const config = {
		context: path.join(__dirname, './application')
	};

	config.entry = BUILD ? {
		application: [
			'./bootstrap.application'
		]
	} : {};

	config.output = BUILD ? {
		path: path.join(__dirname, './build'),
		filename: '[name].js'
	} : {};

	config.devtool = PRODUCTION ? false : 'source-map';

	// webpack modules
	config.module = {};
	config.module.loaders = [];
	config.module.loaders.push({
		test: /\.js$/,
		exclude: /(node_modules)/,
		loaders: ['babel']
	});
	config.module.loaders.push({
		test: /\.jade$/,
		loader: 'jade-loader'
	});
	config.module.loaders.push({
		test: /\.css$/,
		loader: WebpackExtractTextPlugin.extract('css?sourceMap')
	});

	// webpack plugins
	config.plugins = [];
	config.plugins.push(new HtmlWebpackPlugin({
		filename: 'index.html',
		chunks: ['application'],
		inject: true,
		minify: false,
		hash: false,
		title: 'fun-box.ru exam',
		template: path.join(__dirname, './application/view', 'view.jade')
	}));
	config.plugins.push(new WebpackExtractTextPlugin('styles.css', {
		allChunks: false
	}));

	if (PRODUCTION) {
		config.plugins.push(new Webpack.optimize.UglifyJsPlugin({
			compress: {
				warnings: false
			}
		}));
	}

	return config;
};
