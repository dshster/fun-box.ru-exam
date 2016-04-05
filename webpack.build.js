import path from 'path';
import WebpackExtractTextPlugin from 'extract-text-webpack-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';

const buildWebpackConfig = options => {
	const config = {
		context: path.join(__dirname, './application'),
		entry: {
			application: [
				'./bootstrap.application'
			]
		},
		output: {
			path: path.join(__dirname, './build'),
			filename: '[name].js'
		}
	};

	config.devtool = 'source-map';

	// webpack modules
	config.module = {};
	config.module.loaders = [];
	config.module.loaders.push({
		test: /\.js$/,
		exclude: /(node_modules)/,
		loaders: ['babel']
	});
	config.module.loaders.push({
		test: /\.css$/,
		loader: WebpackExtractTextPlugin.extract('css?sourceMap')
	});

	// webpack plugins
	config.plugins = [];
	config.plugins.push(new WebpackExtractTextPlugin('styles.css', {
		allChunks: false
	}));

	return config;
};

export default buildWebpackConfig;
