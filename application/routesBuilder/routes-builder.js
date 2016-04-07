const routesBuilderComponent = {
	bindings: {},
	controllerAs: 'RoutesBuilder',
	controller: RoutesBuilderController,
	template: routesBuilderTemplate,
	replace: true
};

RoutesBuilderController.$inject = ['routesBuilderService'];
function RoutesBuilderController(routesBuilderService) {
	const RoutesBuilder = this;

	RoutesBuilder.routes = {};
	RoutesBuilder.routes.list = [];

	RoutesBuilder.removeWaypoint = (waypoint, index) => {
		if (routesBuilderService.removeWaypoint(waypoint.index)) {
			RoutesBuilder.routes.list.splice(index, 1);
			routesBuilderService.drawRouteLine();
		}
	};

	RoutesBuilder.appendWaypoint = () => {
		if (RoutesBuilder.routes.name) {
			RoutesBuilder.routes.list.push({
				name: RoutesBuilder.routes.name,
				index: routesBuilderService.appendMapWaypoint(RoutesBuilder.routes.name)
			});

			if (1 < RoutesBuilder.routes.list.length) {
				routesBuilderService.drawRouteLine();
			}

			delete RoutesBuilder.routes.name;
		}
	};

	RoutesBuilder.sortWaypoint = index => {
		RoutesBuilder.routes.list.splice(index, 1);
	};

	RoutesBuilder.handlerSortEnd = () => {
		routesBuilderService.reorderWaypoints(RoutesBuilder.routes.list);
	};
}

function routesBuilderTemplate() {
	return require('./routes-builder.jade')();
}

export default routesBuilderComponent;
