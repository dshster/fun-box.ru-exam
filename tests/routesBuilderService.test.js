/* global describe, beforeEach, it, expect */

describe('routesBuilder', function() {
	var $scope;
	var $controller;
	var routesBuilderComponent;

	beforeEach(inject(function($injector) {
		var element = angular.element('<routes-builder></routes-builder>');
		$scope = $rootScope.$new();
		routesBuilderComponent = $compile(element)($scope);
		$controller = element.controller;

		$scope.$digest();
	}));

	it('script load', function() {
	});

	it('test', function() {
	});
});
