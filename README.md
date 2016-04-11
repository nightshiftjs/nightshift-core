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
The usage of the `new` keyword prevents a module from being testable in isolation. A solution is to delegate the instantiation to a factory which can then be injected in the module and mocked for the testing.

The method `nightShift.functions.factoryOf(ConstructorFn)` creates a factory that can instantiate objects by invoking the given constructor function with the arguments it receives.

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