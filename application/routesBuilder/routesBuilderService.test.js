/* global describe, beforeEach, it */

import component from './index';

describe('routesBuilder', function() {
	var routesBuilderService;

	beforeEach(angular.mock.module(component));

	beforeEach(inject(function($injector) {
		routesBuilderService = $injector.get('routesBuilderService');
	}));
});
