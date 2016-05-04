'use strict';

module.exports = function createPromiseUtils(Promise) {

    var promises = {
        Promise: Promise
    };

    /**
     * This method creates a new promise, initially in the pending state, and provides references to the resolving
     * functions that can be used to change its state. It will not return until the given executor function has
     * completed. The resolving functions can be used at any time, before or after the executor has completed, to
     * control the final state of the promise. If the executor throws an exception, its value will be passed to the
     * <i>reject</i> resolving function.
     *
     * @param executor This function is invoked immediately with the resolving functions as its two arguments:
     * <i>executor(resolve, reject)</i>.
     *
     * @returns {Promise} a promise
     */
    promises.newPromise = function (executor) {
        if (promises.Promise) {
            return new promises.Promise(executor);
        }
        throw new Error('No promise implementation available! Please plug nightshift-bluebird or create a NightShift plugin for your favorite promise implementation...');
    };

    /**
     * This method creates a deferred object that exposes the associated Promise instance as well as the resolving
     * functions that can be used to change its state. It is inspired by Kris Kowal's Q.
     *
     * @returns a deferred object
     */
    promises.defer = function () {
        var deferred = {};
        deferred.promise = promises.newPromise(function (resolve, reject) {
            deferred.resolve = resolve;
            deferred.reject = reject;
        });
        return deferred;
    };

    return promises;
};