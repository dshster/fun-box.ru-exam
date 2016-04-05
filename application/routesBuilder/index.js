import '../styles/routes-builder.css';

import angular from 'angular';
import routesBuilderComponent from './routes-builder';

const component = 'routesBuilder';

angular.module(component, [])
	.component('routesBuilder', routesBuilderComponent);

export default component;
