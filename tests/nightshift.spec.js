'use strict';

describe('The NightShift core object', function () {

    var nightShiftFactory = require('../src/nightshift');
    var nightShift, functions;

    beforeEach(function () {
        functions = {};
        nightShift = nightShiftFactory(functions);
    });

    it('should give access to the function utilities', function () {
        expect(nightShift.functions).toBe(functions);
    });

    it('should set up the given plugin', function () {
        var output = 'output';
        var pluginFn = jasmine.createSpy('pluginFn');
        pluginFn.and.returnValue(output);
        expect(nightShift.plugin(pluginFn)).toBe(output);
    });
});