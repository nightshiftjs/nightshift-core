'use strict';

module.exports = function createFunctionUtils() {

    /**
     * The usage of the 'new' keyword prevents a component from being tested in isolation. One solution is to
     * delegate the instantiation to a factory which can then be injected in the component and mocked for the
     * testing.
     *
     * This method creates a factory that can instantiate objects by invoking the specified constructor function
     * with the arguments it receives.
     *
     * @param Constructor the constructor function to use for instantiating objects
     * @returns {Function} a factory function which takes the same arguments as the constructor function
     */
    function factoryOf(Constructor) {
        return function () {
            var args = Array.prototype.slice.call(arguments);
            args.unshift(null);
            var BoundConstructor = Function.prototype.bind.apply(Constructor, args);
            return new BoundConstructor();
        };
    }

    function getParamNames(fn) {
        var STRIP_COMMENTS = /((\/\/.*$)|(\/\*[\s\S]*?\*\/))/mg;
        var fnString = fn.toString().replace(STRIP_COMMENTS, '');
        var result = fnString.slice(fnString.indexOf('(') + 1, fnString.indexOf(')')).match(/([^\s,]+)/g);
        return result || [];
    }

    function getNbOfParams(fn) {
        return getParamNames(fn).length;
    }

    return {
        factoryOf: factoryOf,
        getParamNames: getParamNames,
        getNbOfParams: getNbOfParams
    };
};