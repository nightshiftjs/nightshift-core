# nightshift-core
NightShift has been designed to be configurable and extendable. 

## Configurability
The configurability allows you to use only the features that you need and to avoid undesired dependencies. For example, if you are only interested in [dependency injection](https://github.com/nightshiftjs/nightshift-dependency-injection), then you can configure NightShift as below.

```javascript
var nightShift = require('nightshift-core');
var di = require('nightshift-dependency-injection');

nightShift.plugin(di);
```

## Extendability
The extendability allows you to enrich NightShift with your own plugins. A NightShift plugin is nothing more than a function that enriches the NightShift core object. For example, the plugin below adds logging capabilities to NightShift.

```javascript
module.exports = function plugin(nightShift) {
    nightShift.logger = {...};    
};
```

A plugin can rely on the availability of other plugins at runtime. However, it is recommended not to make a plugin explicitly dependent on another plugin, so different versions or implementations of the same plugins can be combined.

## Utilities
The NightShift core object provides some utilities.

### functions
#### factoryOf(ConstructorFn)
The usage of the `new` keyword prevents a module from being testable in isolation. Using `new` makes it impossible to test a module without (re-)testing the delegate it instantiates. A solution is to encapsulate the instantiation in a factory which can then be injected in the module and mocked for the testing.

The method `nightShift.functions.factoryOf(ConstructorFn)` creates a factory that can instantiate objects by invoking the given constructor function with the parameters it receives.

```javascript
it('should return a factory for the specified constructor function', function () {
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
it('should return the names of the parameters of the specified function', function () {
    expect(nightShift.functions.getParamNames(function () {})).toEqual([]);
    expect(nightShift.functions.getParamNames(function (one) {})).toEqual(['one']);
    expect(nightShift.functions.getParamNames(function (one, two) {})).toEqual(['one', 'two']);
});
```

### getNbOfParams(fn)
The method `nightShift.functions.getNbOfParams(fn)` returns the number of parameters which are expected by the given function.

```javascript
it('should return the number of parameters of the specified function', function () {
    expect(nightShift.functions.getNbOfParams(function () {})).toEqual(0);
    expect(nightShift.functions.getNbOfParams(function (one) {})).toEqual(1);
    expect(nightShift.functions.getNbOfParams(function (one, two) {})).toEqual(2);
});
```

## Tests

```
npm install && npm test
```