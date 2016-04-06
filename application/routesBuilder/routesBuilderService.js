routesBuilderService.$inject = ['$q'];
export default function routesBuilderService($q) {
	const routesBuilderService = {};
	let mapContainer;
	let waypointsCollection;
	let routeLineCollection;

	routesBuilderService.mapReady = id => {
		ymaps.ready(() => {
			routesBuilderService.mapInitialize(id);
		});
	};

	routesBuilderService.mapInitialize = id => {
		routesBuilderService.setMapContainer(new ymaps.Map(id, {
			center: [55.76, 37.64],
			controls: ['zoomControl'],
			zoom: 7
		}));

		routesBuilderService.setWaypointsCollection(new ymaps.GeoObjectCollection({}, {
			preset: 'islands#redIcon'
		}));

		routesBuilderService.setRouteLineCollection(new ymaps.GeoObjectCollection({}, {
			strokeColor: '#000000',
			strokeWidth: 3
		}));

		mapContainer.geoObjects
			.add(waypointsCollection)
			.add(routeLineCollection);
	};

	routesBuilderService.drawRouteLine = () => {
		const coordsList = [];
		// refresh route line
		// https://tech.yandex.ru/maps/doc/jsapi/2.1/ref/reference/Polyline-docpage/
		// https://tech.yandex.ru/maps/jsbox/2.1/object_manager_spatial

		waypointsCollection.each(item => {
			coordsList.push(item.geometry.getCoordinates());
		});

		routeLineCollection.removeAll();
		routeLineCollection.add(new ymaps.Polyline(coordsList, {
			hintContent: 'Маршрут'
		}));
	};

	routesBuilderService.getMapCenter = () => mapContainer.getCenter();

	routesBuilderService.waypointBalloonEvents = (waypoint, properties) => {
		waypoint.events.add('dragend', event => {
			routesBuilderService.drawRouteLine();
		});

		waypoint.events.add('balloonopen', event => {
			const coords = waypoint.geometry.getCoordinates();

			let balloonContent = properties.waypointName;

			waypoint.properties.set('balloonContent', 'Идёт загрузка данных...');
			routesBuilderService.getGeocode(coords).then(address => {
				balloonContent = `${balloonContent}<br>Адрес: <strong>${address}</strong>`;
			}, error => {
				balloonContent = `${balloonContent}<br>Не удалось получить адрес.`;
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

	routesBuilderService.setWaypointsCollection = collection => {
		waypointsCollection = collection;
	};

	routesBuilderService.setRouteLineCollection = collection => {
		routeLineCollection = collection;
	};

	routesBuilderService.appendMapWaypoint = name => {
		const waypoint = new ymaps.Placemark(routesBuilderService.getMapCenter(), {
			hintContent: name
		}, {
			openEmptyBalloon: true,
			draggable: true
		});

		routesBuilderService.waypointBalloonEvents(waypoint, {
			waypointName: name
		});

		waypointsCollection.add(waypoint);

		return waypoint;
	};

	routesBuilderService.removeWaypoint = waypoint => {
		return waypoint.setParent(null);
	};

	return routesBuilderService;
}
