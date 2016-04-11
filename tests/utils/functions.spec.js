'use strict';

describe('The function utilities', function () {

    var functions = require('../../src/utils/functions')();

    it('should return a factory for the specified constructor function', function () {
        var Point  = function (x, y) {
            this.x = x;
            this.y = y;
        };
        var factory = functions.factoryOf(Point);
        expect(factory(10, 20)).toEqual(new Point(10, 20));
    });

    it('should return the names of the parameters of the specified function', /* jshint unused:false */ function () {
        expect(functions.getParamNames(function () {})).toEqual([]);
        expect(functions.getParamNames(function (one) {})).toEqual(['one']);
        expect(functions.getParamNames(function (one, two) {})).toEqual(['one', 'two']);
    });

    it('should return the number of parameters of the specified function', /* jshint unused:false */ function () {
        expect(functions.getNbOfParams(function () {})).toEqual(0);
        expect(functions.getNbOfParams(function (one) {})).toEqual(1);
        expect(functions.getNbOfParams(function (one, two) {})).toEqual(2);
    });
});