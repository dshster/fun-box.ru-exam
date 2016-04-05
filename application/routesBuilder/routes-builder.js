const routesBuilderComponent = {
	bindings: {},
	controllerAs: 'RoutesBuilder',
	controller: RoutesBuilderController,
	template: routesBuilderTemplate,
	replace: true
};

RoutesBuilderController.$inject = [];
function RoutesBuilderController() {
	const RoutesBuilder = this;

	RoutesBuilder.routes = {};
	RoutesBuilder.routes.list = [];

	RoutesBuilder.appendRoute = () => {
		if (RoutesBuilder.routes.append) {
			// Здесь должна быть работа с API Yandex maps
			// Добавление точек в массив точек карты
			RoutesBuilder.routes.list.push({
				name: RoutesBuilder.routes.append,
				coords: []
			});

			delete RoutesBuilder.routes.append;
		}
	};
}

function routesBuilderTemplate() {
	return require('./routes-builder.jade')();
}

export default routesBuilderComponent;
