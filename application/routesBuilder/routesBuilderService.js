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
		const Map = routesBuilderService.setMapContainer(new ymaps.Map(id, {
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

		Map.geoObjects
			.add(routesBuilderService.getWaypointsCollection())
			.add(routesBuilderService.getRouteLineCollection());
	};

	routesBuilderService.drawRouteLine = () => {
		const coordsList = [];
		const Lines = routesBuilderService.getRouteLineCollection();
		const Waypoints = routesBuilderService.getWaypointsCollection();

		let routeLine;

		Waypoints.each(item => {
			coordsList.push(item.geometry.getCoordinates());
		});

		if (0 === Lines.getLength()) {
			routeLine = new ymaps.Polyline([], {
				hintContent: 'Маршрут'
			});
			Lines.add(routeLine);
		} else {
			routeLine = Lines.get(0);
		}

		routeLine.geometry.setCoordinates(coordsList);
	};

	routesBuilderService.getMapCenter = () => routesBuilderService.getMapContainer().getCenter();

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

		return mapContainer;
	};

	routesBuilderService.getMapContainer = () => mapContainer;

	routesBuilderService.setWaypointsCollection = collection => {
		waypointsCollection = collection;
	};

	routesBuilderService.getWaypointsCollection = collection => waypointsCollection;

	routesBuilderService.setRouteLineCollection = collection => {
		routeLineCollection = collection;
	};

	routesBuilderService.getRouteLineCollection = collection => routeLineCollection;

	routesBuilderService.appendMapWaypoint = name => {
		const Waypoints = routesBuilderService.getWaypointsCollection();
		let waypointIndex;

		const waypoint = new ymaps.Placemark(routesBuilderService.getMapCenter(), {
			hintContent: name
		}, {
			openEmptyBalloon: true,
			draggable: true
		});

		routesBuilderService.waypointBalloonEvents(waypoint, {
			waypointName: name
		});

		Waypoints.add(waypoint);

		let waypointsArray = Waypoints.toArray();

		waypointIndex = Math.max(...waypointsArray.map(waypoint => {
			return waypoint.properties.get('index') ? waypoint.properties.get('index') : 0;
		}));

		waypoint.properties.set('index', ++waypointIndex);

		return waypointIndex;
	};

	routesBuilderService.removeWaypoint = index => {
		const Waypoints = routesBuilderService.getWaypointsCollection();

		Waypoints.each(waypoint => {
			if (index === waypoint.properties.get('index')) {
				waypoint.setParent(null);
			}
		});

		return index;
	};

	routesBuilderService.reorderWaypoints = list => {
		const Waypoints = routesBuilderService.getWaypointsCollection();
		const waypointsList = Waypoints.toArray();

		Waypoints.removeAll();

		waypointsList.sort((a, b) => {
			if (a.properties.get('index') < b.properties.get('index')) return -1;
			if (a.properties.get('index') > b.properties.get('index')) return 1;
			return 0;
		});

		list.forEach(waypoint => {
			Waypoints.add(waypointsList.filter(point => waypoint.index === point.properties.get('index'))[0]);
		});

		routesBuilderService.drawRouteLine();
	};

	return routesBuilderService;
}
