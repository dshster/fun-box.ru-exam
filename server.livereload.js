var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');
var opener = require('opener');

var config = require('./webpack.config');

config.entry.application.unshift('webpack-dev-server/client?http://localhost:8080', 'webpack/hot/dev-server');
config.plugins.push(new webpack.HotModuleReplacementPlugin());

config.devServer = {};
config.devServer.hot = true;
config.devServer.inline = true;

const compiler = webpack(config);
const server = new WebpackDevServer(compiler, {
	hot: true,
	contentBase: '/build',
	noInfo: true,
	filename: 'application.js',
	publicPath: '/',
	watchOptions: {
		aggregateTimeout: 200,
		poll: 500
	},
	headers: {},
	stats: {
		colors: true
	}
});

server.listen(8080, 'localhost', function() {
	const site = 'http://localhost:8080/';

	process.stdout.write('Site start on: ' + site);
	opener(site);
});
