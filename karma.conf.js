var webpackConfig = require('./webpack.test');

module.exports = function(config) {
	config.set({
		basePath: '',
		frameworks: [
			'jasmine'
		],
		files: [
			'application/bootstrap.application.test.js'
		],
		preprocessors: {
			'application/bootstrap.application.test.js': ['webpack']
		},
		exclude: [],
		reporters: ['progress'],
		port: 9876,
		colors: true,
		logLevel: config.LOG_INFO,
		autoWatch: true,
		browsers: [
			'Firefox'
		],
		singleRun: false,
		concurrency: Infinity,
		webpack: webpackConfig,
		plugins: [
			'karma-webpack',
			'karma-jasmine',
			'karma-firefox-launcher',
			'karma-babel-preprocessor'
		]
	});
};
