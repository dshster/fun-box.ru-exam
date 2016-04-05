import webpack from 'webpack';
import WebpackDevServer from 'webpack-dev-server';
import opener from 'opener';

import config from './webpack.config.babel';

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
	stats: { colors: true }
});

server.listen(8080, 'localhost', function() {
	const site = 'http://localhost:8080/';

	process.stdout.write(`Site start on: ${site}`);
	opener(site);
});
