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
		let routeLine;

		waypointsCollection.each(item => {
			coordsList.push(item.geometry.getCoordinates());
		});

		if (0 === routeLineCollection.getLength()) {
			routeLine = new ymaps.Polyline([], {
				hintContent: 'Маршрут'
			});
			routeLineCollection.add(routeLine);
		} else {
			routeLine = routeLineCollection.get(0);
		}

		routeLine.geometry.setCoordinates(coordsList);
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
		let waypointIndex = 0;

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
		waypointsCollection.each(waypoint => {
			waypointIndex = waypoint.properties.get('index') ? waypoint.properties.get('index') : waypointIndex;
		});

		waypoint.properties.set('index', ++waypointIndex);

		return waypointIndex;
	};

	routesBuilderService.removeWaypoint = index => {
		waypointsCollection.each(waypoint => {
			if (index === waypoint.properties.get('index')) {
				waypoint.setParent(null);
			}
		});
		return true;
	};

	routesBuilderService.reorderWaypoints = list => {
		const waypointsList = waypointsCollection.toArray();

		waypointsCollection.removeAll();

		waypointsList.sort((a, b) => {
			if (a.properties.get('index') < b.properties.get('index')) return -1;
			if (a.properties.get('index') > b.properties.get('index')) return 1;
			return 0;
		});

		list.forEach(waypoint => {
			waypointsCollection.add(waypointsList.filter(point => waypoint.index === point.properties.get('index'))[0]);
		});

		routesBuilderService.drawRouteLine();
	};

	return routesBuilderService;
}
