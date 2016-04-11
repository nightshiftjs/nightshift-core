'use strict';

module.exports = function createFunctionUtils() {

    /**
     * The usage of the 'new' keyword prevents a module from being testable in isolation. Using 'new' makes it
     * impossible to test a module without (re-)testing the delegate it instantiates. A solution is to encapsulate the
     * instantiation in a factory which can then be injected in the module and mocked for the testing.
     *
     * This method creates a factory that can instantiate objects by invoking the given constructor function with the
     * parameters it receives.
     *
     * @param {function} Constructor the constructor function to use for instantiating objects
     * @returns {function} a factory function that expects the same parameters as the given constructor function
     */
    function factoryOf(Constructor) {
        return function () {
            var args = Array.prototype.slice.call(arguments);
            args.unshift(null);
            var BoundConstructor = Function.prototype.bind.apply(Constructor, args);
            return new BoundConstructor();
        };
    }

    /**
     * This method returns an array listing the names of the parameters of the given function. The array is empty if the
     * function does not expect any parameter.
     *
     * @param {function} fn the function to retrieve the parameters names for
     * @returns {Array|{index: number, input: string}} an array listing the names of the parameters of the given
     * function, or an empty array if the function does not expect any parameter
     */
    function getParamNames(fn) {
        var STRIP_COMMENTS = /((\/\/.*$)|(\/\*[\s\S]*?\*\/))/mg;
        var fnString = fn.toString().replace(STRIP_COMMENTS, '');
        var result = fnString.slice(fnString.indexOf('(') + 1, fnString.indexOf(')')).match(/([^\s,]+)/g);
        return result || [];
    }

    /**
     * This method returns the number of parameters which are expected by the given function.
     *
     * @param {function} fn the function to retrieve the number of parameters for
     * @returns {Number} the number of parameters which are expected by the given function
     */
    function getNbOfParams(fn) {
        return getParamNames(fn).length;
    }

    return {
        factoryOf: factoryOf,
        getParamNames: getParamNames,
        getNbOfParams: getNbOfParams
    };
};