![ChevronJS](./logo.png)

# ChevronJS

> A super tiny JavaScript library for module declaration

## Introduction

Chevron is an extremely small(780Byte) JavaScript library for easy module declaration,
dependency management and lazy module loading,
inspired by [BottleJS](https://github.com/young-steveo/bottlejs),
and the [AngularJS Module API](https://docs.angularjs.org/api/ng/type/angular.Module).

[Demo](http://codepen.io/FelixRilling/pen/AXgydJ)

## Usage

Chevron can be installed from the npm registry:

```shell
npm install chevronjs --save
```

```shell
yarn add chevronjs
```

## Syntax

### Constructor

To start with Chevron, you need to create a new Chevron container:

```javascript
const cv = new Chevron();
```

### Module Types

Chevron comes with two built-in types.

#### Services

Services are the most common type of module. A service is simply a function wrapped by Chevron to inject dependencies.
The syntax for `service` is as follows:

```javascript
//Create new service
//Chevron.prototype.service(name,[dependencies],function);
cv.service("myService", [], function() {
    return 12;
});
//Access service from the Chevron Container
//Chevron.prototype.access(name);
const myService = cv.access("myService");
myService(); //returns 12
```

With dependencies:

```javascript
cv.service("myService", [], function() {
    return 12;
});

//declare the service "foo" as dependency and as function argument
cv.service("myOtherService", ["myService"], function(myService, int) {
    return int * myService();
});

const myOtherService = cv.access("myOtherService");
myOtherService(2); //returns 24
```

#### Factories

Factories are very similar to services but are treated as **Constructors** instead of functions.
Factories can be called with the `factory` method.

```javascript
//Chevron.prototype.factory(name,[dependencies],Constructor);
cv.factory("myFactory", [], function() {
    this.foo = 12;
    this.bar = 17;
});

const myFactory = cv.access("myFactory");
myFactory.bar; //returns 17
```

Combined with a service:

```javascript
cv.factory("myFactory", [], function() {
    this.foo = 7;
    this.bar = 17;
});

cv.service("myService", ["myFactory"], function(myFactory, int) {
    return int * myFactory.foo;
});

const myService = cv.access("myService");
myService(3); //returns 21
```

### Accessing Modules

Modules can be accessed in two ways.
In most cases, you will want to get your module trough Chevrons `access` method,
which returns the constructed module with all dependencies:

```javascript
//Chevron.prototype.access(name)
cv.access("myModule"); //returns the service or factory with dependencies injected into arguments
```

Or, if you just want the module itself without dependencies from the Chevron container(called "$map"):

```javascript
cv.$map.get("myModule"); //returns the service as Chevron object.
```

## API

You can easily create your own module type by using the Chevron API.
To declare a new type, simply call the `extend` method with a typeName and constructorFunction for your new type:

```javascript
//Chevron.prototype.extend(typeName,constructorFunction);
cv.extend("myType", function(moduleContent, dependencies) {
    //Dereference fn to avoid unwanted recursion
    const serviceFn = moduleContent;

    moduleContent = function () {
        //Chevron service function wrapper
        //return function with args injected
        return serviceFn.apply(null, dependencies.concat(Array.from(arguments)));
    };

    return moduleContent;
});
```

In the example above we created a new module type, "myType", with the given function as the constructor.
You'll probably want to start by using a modified version of the default Service or Factory constructorFunction,
which you can find in the in ["src/types"](https://github.com/FelixRilling/chevronjs/tree/master/src/types) folder of this repository.

After you created the new type, you can use it by calling the type as a method of the Chevron instance:

```javascript
//Chevron.prototype.#name#(name,[dependencies],content);
cv.myType("myTypeModule", [], function() {
    return "bar";
});
```

Then you can simply call `access` again to access your new module type.

```javascript
cv.access("myTypeModule");
```

## Upgrading

 **6.x to 7.x:** Make sure to your custom types to only use moduleContent instead of the whole module, see the updated examples above
