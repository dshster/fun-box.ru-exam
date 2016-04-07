/* global describe, browser, beforeEach, it, expect, by */

describe('Routes builder', function() {
	var form;
	var appendInput;
	var list;
	var map;

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

	describe('fill route waypoints', function() {
		beforeEach(function() {
			appendInput.sendKeys('First waypoint');
			appendInput.sendKeys(protractor.Key.ENTER);

			appendInput.sendKeys('Second waypoint');
			appendInput.sendKeys(protractor.Key.ENTER);

			appendInput.sendKeys('Third waypoint');
			appendInput.sendKeys(protractor.Key.ENTER);
		});

		it('waypoints submit', function() {
			expect(list.count()).toBe(3);
		});

		xit('waypoint remove', function() {
		});
	});
});
