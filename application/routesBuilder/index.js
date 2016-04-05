import '../styles/routes-builder.css';

import angular from 'angular';
import routesBuilderComponent from './routes-builder';
import routesMapDirective from './routes-map';

const component = 'routesBuilder';

angular.module(component, [])
	.component('routesBuilder', routesBuilderComponent)
	.directive('routesMap', routesMapDirective);

export default component;
