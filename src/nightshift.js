'use strict';

module.exports = function createNightShiftObject(functions) {

    function NightShift() {}

    NightShift.prototype.functions = functions;

    NightShift.prototype.plugin = function(pluginFn) {
        return pluginFn(this);
    };

    return new NightShift();
};