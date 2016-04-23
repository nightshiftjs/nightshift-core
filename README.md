# nightshift-core
[NightShift](https://github.com/nightshiftjs) has been designed to be configurable and extendable. 

## Configurability
The configurability allows you to use only the features that you need and to avoid undesired dependencies. For example, if you are only interested in [dependency injection](https://github.com/nightshiftjs/nightshift-dependency-injection), then you can configure NightShift as below.

```javascript
var nightShift = require('nightshift-core');
var di = require('nightshift-dependency-injection');

nightShift.plugin(di);
```

NightShift is exactly what you want it to be!

## Extendability
The extendability allows you to enrich NightShift with your own plugins. A NightShift plugin is nothing more than a function that enriches the NightShift core object. For example, the plugin below adds logging capabilities to NightShift.

```javascript
module.exports = function plugin(nightShift) {
    nightShift.logger = {...};    
};
```

A plugin can rely on the availability of other plugins at runtime. However, it is recommended not to make a plugin explicitly dependent on another plugin. This makes it possible to combine different versions or implementations of the same plugins.

## Demo
Discover what you can do with NightShift in this [demo](https://github.com/nightshiftjs/nightshift-demo)!

## Utilities
The NightShift core object provides some utilities.

### functions
#### factoryOf(ConstructorFn)
The usage of the `new` keyword prevents a module from being testable in isolation. Using `new` makes it impossible to test a module without retesting the delegate it instantiates. A solution is to encapsulate the instantiation in a factory which can then be injected in the module and mocked for the testing.

The method `nightShift.functions.factoryOf(ConstructorFn)` creates a factory that can instantiate objects by invoking the given constructor function with the parameters it receives.

```javascript
it('should return a factory for the given constructor function', function () {
    var Point  = function (x, y) {
        this.x = x;
        this.y = y;
    };
    var factory = nightShift.functions.factoryOf(Point);
    expect(factory(10, 20)).toEqual(new Point(10, 20));
});
```

### getParamNames(fn)
The method `nightShift.functions.getParamNames(fn)` returns an array listing the names of the parameters of the given function. The array is empty if the function does not expect any parameter.

```javascript
it('should return the names of the parameters of the given function', function () {
    expect(nightShift.functions.getParamNames(function () {})).toEqual([]);
    expect(nightShift.functions.getParamNames(function (one) {})).toEqual(['one']);
    expect(nightShift.functions.getParamNames(function (one, two) {})).toEqual(['one', 'two']);
});
```

### getNbOfParams(fn)
The method `nightShift.functions.getNbOfParams(fn)` returns the number of parameters which are expected by the given function.

```javascript
it('should return the number of parameters of the given function', function () {
    expect(nightShift.functions.getNbOfParams(function () {})).toEqual(0);
    expect(nightShift.functions.getNbOfParams(function (one) {})).toEqual(1);
    expect(nightShift.functions.getNbOfParams(function (one, two) {})).toEqual(2);
});
```

## Contribute
The tests can be executed by running the command below.
```
npm install && npm test
```

The test coverage can be checked by running the command below. It executes the tests and it generates a coverage report in _build/coverage/index.html_.
```
npm install && npm build-coverage
```

The quality of the code can be checked by running the command below. It detects potential problems in the code with JSHint, it executes the tests and it generates a coverage report. 
```
npm install && npm build
```