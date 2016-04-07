import '../styles/routes-builder.css';
import '../../node_modules/angular-drag-and-drop-lists/demo/simple/simple.css';

import angular from 'angular';
import 'angular-drag-and-drop-lists';

import routesBuilderService from './routesBuilderService';
import routesBuilderComponent from './routes-builder';
import routesMapDirective from './routes-map';

const component = 'routesBuilder';

angular.module(component, ['dndLists'])
	.factory('routesBuilderService', routesBuilderService)
	.component('routesBuilder', routesBuilderComponent)
	.directive('routesMap', routesMapDirective);

export default component;
