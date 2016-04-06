routesBuilderService.$inject = ['$q'];
export default function routesBuilderService($q) {
	const routesBuilderService = {};
	let mapContainer;

	routesBuilderService.mapReady = id => {
		ymaps.ready(() => {
			routesBuilderService.mapInitialize(id);
		});
	};

	routesBuilderService.mapInitialize = id => {
		routesBuilderService.setMapContainer(new ymaps.Map(id, {
			center: [55.76, 37.64],
			zoom: 7
		}));
	};

	routesBuilderService.getMapCenter = () => mapContainer.getCenter();

	routesBuilderService.waypointBalloonEvents = (waypoint, properties) => {
		waypoint.events.add('balloonopen', event => {
			const coords = waypoint.geometry.getCoordinates();
			let balloonContent;

			waypoint.properties.set('balloonContent', 'Идет загрузка данных...');
			routesBuilderService.getGeocode(coords).then(address => {
				balloonContent = `${properties.waypointName}<br>Адрес: <strong>${address}</strong>`;
			}, error => {
				balloonContent = `${properties.waypointName}<br>Не удалось получить адрес.`;
			}).finally(() => {
				waypoint.properties.set('balloonContent', balloonContent);
			});
		});
	};

	routesBuilderService.getGeocode = coords => $q((resolve, reject) => {
		ymaps.geocode(coords, {
			results: 1
		}).then(result => {
			result.geoObjects.get(0) ? resolve(result.geoObjects.get(0).properties.get('name')) : reject();
		});
	});

	routesBuilderService.setMapContainer = map => {
		mapContainer = map;
	};

	routesBuilderService.appendMapPlaceholder = name => {
		const waypoint = new ymaps.Placemark(routesBuilderService.getMapCenter(), {
			hintContent: name
		}, {
			preset: 'islands#icon',
			openEmptyBalloon: true,
			draggable: true
		});

		routesBuilderService.waypointBalloonEvents(waypoint, {
			waypointName: name
		});

		mapContainer.geoObjects.add(waypoint);
		return waypoint;
	};

	return routesBuilderService;
}
