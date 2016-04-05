import builder from './webpack.build';

export default builder({
	process: 'build',
	environment: process.env.NODE_ENV
});
