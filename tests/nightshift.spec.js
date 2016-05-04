'use strict';

describe('The NightShift core object', function () {

    var nightShiftFactory = require('../src/nightshift');
    var nightShift, functions, promises;

    beforeEach(function () {
        functions = 'functions';
        promises = 'promises';
        nightShift = nightShiftFactory(functions, promises);
    });

    it('should expose the function utilities', function () {
        expect(nightShift.functions).toBe(functions);
    });

    it('should expose the promise utilities', function () {
        expect(nightShift.promises).toBe(promises);
    });

    it('should set up the given plugin', function () {
        var output = 'output';
        var pluginFn = jasmine.createSpy('pluginFn');
        pluginFn.and.returnValue(output);
        expect(nightShift.plugin(pluginFn)).toBe(output);
    });
});