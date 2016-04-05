routesMap.$inject = [];

export default function routesMap() {
	const directive = {
		scope: false,
		replace: true,
		link: routesMapLink
	};

	function ymapsInit(id) {
		const map = new ymaps.Map(id, {
			center: [55.76, 37.64],
			zoom: 7
		});
	}

	function routesMapLink(scope, element, attributes) {
		ymaps.ready(function() {
			ymapsInit(attributes.id);
		});
	}

	return directive;
}
