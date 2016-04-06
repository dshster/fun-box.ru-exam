routesMap.$inject = ['routesBuilderService'];

export default function routesMap(routesBuilderService) {
	const directive = {
		scope: false,
		controller: RoutesMapController,
		controllerAs: 'RoutesMap',
		bindToController: {
			routesList: '='
		},
		link: routesMapLink
	};

	RoutesMapController.$inject = [];

	function RoutesMapController() {
		const RoutesMap = this;

	}

	function routesMapLink(scope, element, attributes) {
		routesBuilderService.mapReady(attributes.id);
	}

	return directive;
}
