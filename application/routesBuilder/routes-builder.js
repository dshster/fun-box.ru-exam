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

	RoutesBuilder.appendRoute = () => {
		if (RoutesBuilder.routes.name) {
			RoutesBuilder.routes.list.push({
				name: RoutesBuilder.routes.name,
				object: routesBuilderService.appendMapPlaceholder(RoutesBuilder.routes.name)
			});

			delete RoutesBuilder.routes.name;
		}
	};
}

function routesBuilderTemplate() {
	return require('./routes-builder.jade')();
}

export default routesBuilderComponent;
