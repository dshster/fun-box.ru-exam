var $compile;
var $rootScope;
var routesBuilderService;

beforeEach(angular.mock.module('application'));

beforeEach(inject(function($injector) {
	$compile = $injector.get('$compile');
	$rootScope = $injector.get('$rootScope');
	routesBuilderService = $injector.get('routesBuilderService');
}));
