'use strict';

describe('The promise utilities', function () {

    var promisesFactory = require('../../src/utils/promises');

    it('should create a ES6 promise', function () {
        var promises = promisesFactory(Promise);
        var executor = jasmine.createSpy('executor');
        var promise = promises.newPromise(executor);
        expect(executor).toHaveBeenCalledWith(jasmine.any(Function), jasmine.any(Function));
        expect(promise).toEqual(jasmine.any(Promise));
    });

    it('should create a deferred object', function () {
        var promises = promisesFactory(Promise);
        var deferred = promises.defer();
        expect(deferred).toEqual({
            promise: jasmine.any(Promise),
            resolve: jasmine.any(Function),
            reject: jasmine.any(Function)
        });
    });

    it('should fulfill the promise when resolving a deferred object', function (done) {
        var promises = promisesFactory(Promise);
        var deferred = promises.defer();
        var fulfillment = 'fulfillment';
        deferred.resolve(fulfillment);

        var onFulfill = jasmine.createSpy('onFulfill');
        deferred.promise
            .then(onFulfill)
            .then(function () {
                expect(onFulfill).toHaveBeenCalledWith(fulfillment);
            })
            .then(done);
    });

    it('should reject the promise when rejecting a deferred object', function (done) {
        var promises = promisesFactory(Promise);
        var deferred = promises.defer();
        var error = 'error';
        deferred.reject(error);

        var onReject = jasmine.createSpy('onReject');
        deferred.promise
            .then(null, onReject)
            .then(function () {
                expect(onReject).toHaveBeenCalledWith(error);
            })
            .then(done);
    });

    it('should fail when creating a promise if no promise implementation can be found', function () {
        var promises = promisesFactory();
        expect(function () {
            promises.newPromise();
        }).toThrow();
    });

    it('should fail when creating a deferred object if no promise implementation can be found', function () {
        var promises = promisesFactory();
        expect(function () {
            promises.defer();
        }).toThrow();
    });

    it('should give access to the Promise constructor', function () {
        var promises = promisesFactory(Promise);
        expect(promises.Promise).toBe(Promise);
    });

    it('should use the last Promise constructor that has been set', function () {
        var promises = promisesFactory();
        expect(function () {
            promises.newPromise();
        }).toThrow();

        promises.Promise = Promise;
        var executor = jasmine.createSpy('executor');
        var promise = promises.newPromise(executor);
        expect(promise).toEqual(jasmine.any(Promise));
    });
});