exports.config = {
	seleniumAddress: 'http://127.0.0.1:4444/wd/hub',
	directConnect: true,
	specs: ['./tests/e2e/*.spec.js'],
	capabilities: {
		browserName: 'firefox'
	},
	chromeOnly: false,
	framework: 'jasmine',
	jasmineNodeOpts: {
		defaultTimeoutInterval: 30000
	}
};
