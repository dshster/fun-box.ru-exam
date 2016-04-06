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
		if (routesBuilderService.removeWaypoint(waypoint.object)) {
			RoutesBuilder.routes.list.splice(index, 1);
			routesBuilderService.drawRouteLine();
		}
	};

	RoutesBuilder.appendWaypoint = () => {
		if (RoutesBuilder.routes.name) {
			RoutesBuilder.routes.list.push({
				name: RoutesBuilder.routes.name,
				object: routesBuilderService.appendMapWaypoint(RoutesBuilder.routes.name)
			});

			if (1 < RoutesBuilder.routes.list.length) {
				routesBuilderService.drawRouteLine();
			}

			delete RoutesBuilder.routes.name;
		}
	};
}

function routesBuilderTemplate() {
	return require('./routes-builder.jade')();
}

export default routesBuilderComponent;
