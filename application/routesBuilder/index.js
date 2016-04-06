import '../styles/routes-builder.css';

import angular from 'angular';
import routesBuilderService from './routesBuilderService';
import routesBuilderComponent from './routes-builder';
import routesMapDirective from './routes-map';

const component = 'routesBuilder';

angular.module(component, [])
	.factory('routesBuilderService', routesBuilderService)
	.component('routesBuilder', routesBuilderComponent)
	.directive('routesMap', routesMapDirective);

export default component;
