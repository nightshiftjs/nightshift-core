'use strict';

describe('The NightShift core API', function () {

    var nightShift = require('../src');

    it('should expose the function utilities', function () {
        expect(nightShift.functions).toEqual({
            factoryOf: jasmine.any(Function),
            getParamNames: jasmine.any(Function),
            getNbOfParams: jasmine.any(Function)
        });
    });

    it('should expose the promise utilities', function () {
        expect(nightShift.promises).toEqual({
            Promise: jasmine.any(Function),
            newPromise: jasmine.any(Function),
            defer: jasmine.any(Function)
        });
    });

    it('should be extendable with plugins', function () {
        expect(nightShift.plugin).toEqual(jasmine.any(Function));
    });
});