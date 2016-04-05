import 'normalize-css';

import angular from 'angular';
import {compileConfig} from './config';
import routesBuilder from './routesBuilder';

const components = [routesBuilder];

angular.module('application', components)
	.config(compileConfig);
