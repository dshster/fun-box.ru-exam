import 'angular';
import 'angular-mocks';

const testContext = require.context('.', true, /\.test\.js$/);
testContext.keys().forEach(testContext);
