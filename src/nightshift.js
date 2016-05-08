'use strict';

module.exports = function createNightShiftObject(functions, promises) {

    function NightShift() {}

    NightShift.prototype.functions = functions;

    NightShift.prototype.promises = promises;

    NightShift.prototype.plugin = function(pluginFn) {
        return pluginFn(this);
    };

    return new NightShift();
};