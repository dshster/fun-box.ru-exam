/* global describe, browser, beforeEach, it, expect, by */

describe('Routes builder', function() {
	var form;
	var appendInput;
	var list;
	var map;

	var ymapsversion = '2-1-38';

	function appendPlacemarks() {
		appendInput.sendKeys('First waypoint');
		appendInput.sendKeys(protractor.Key.ENTER);

		appendInput.sendKeys('Second waypoint');
		appendInput.sendKeys(protractor.Key.ENTER);

		appendInput.sendKeys('Third waypoint');
		appendInput.sendKeys(protractor.Key.ENTER);

		appendInput.sendKeys('Fourth waypoint');
		appendInput.sendKeys(protractor.Key.ENTER);
	}

	beforeEach(function() {
		browser.get('http://localhost:8080/');

		form = element(by.css('form[name="appendWaypointForm"]'));
		appendInput = element(by.model('RoutesBuilder.routes.name'));
		list = element.all(by.repeater('waypoint in RoutesBuilder.routes.list'));
		map = element(by.id('routes_map'));
	});

	it('form to be exist', function() {
		expect(form.isPresent()).toBeTruthy();
	});

	it('append input to be exist', function() {
		expect(appendInput.isPresent()).toBeTruthy();
	});

	it('road waypoint count to be 0', function() {
		expect(list.count()).toBe(0);
	});

	it('waypoint submit', function() {
		appendInput.sendKeys('First waypoint');
		appendInput.sendKeys(protractor.Key.ENTER);

		expect(list.count()).toBe(1);
	});

	it('map to be exist', function() {
		expect(map.element(by.css('ymaps')).isPresent()).toBeTruthy();
	});

	describe('fill route waypoints', function() {
		beforeEach(function() {
			appendPlacemarks();
		});

		it('waypoints submit', function() {
			expect(list.count()).toBe(4);
		});

		it('first waypoint equal name', function() {
			list.get(0).element(by.binding('waypoint.name')).getText().then(function(text) {
				expect(text).toEqual('First waypoint');
			});
		});

		it('remove second waypoint', function() {
			list.get(1).element(by.css('.routes__item-remove')).click();
			expect(list.count()).toBe(3);
			list.get(1).element(by.binding('waypoint.name')).getText().then(function(text) {
				expect(text).toEqual('Third waypoint');
			});
		});

		it('waypoints draggable attribute to be true', function() {
			list.get(0).getAttribute('draggable').then(function(attr) {
				expect(attr).toBeTruthy();
			});
		});

		xit('sort', function() {
			var target = list.get(3).getWebElement();
			var dest = list.get(1).getWebElement();

			// Сортировка не работает, я не разобрался.

			browser.actions()
				.mouseMove(target, {x: 20, y: 5})
				.mouseDown()
				.mouseMove(dest, {x: 20, y: 5})
				.mouseUp()
				.perform();

			list.get(0).element(by.binding('waypoint.name')).getText().then(function(text) {
				expect(text).toEqual('Third waypoint');
			});
		}, 60000);
	});

	describe('test placemark', function() {
		var placemarks;
		var placemarkclass = '.ymaps-' + ymapsversion + '-placemark-overlay';

		// Тут по-хорошему нужно подключаться у window.ymaps
		// и брать данные из API карт

		beforeEach(function() {
			appendPlacemarks();
			placemarks = element.all(by.css('#routes_map ymaps ' + placemarkclass));
		});

		it('placemarks to be exist', function() {
			expect(placemarks.count()).toBe(4);
		});
	});
});
