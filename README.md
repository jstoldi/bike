> ![Stage](https://github.com/behere/behere.github.com/raw/master/assets/stage/production.png)  
[![Build Status](https://secure.travis-ci.org/behere/bike.png)](http://travis-ci.org/behere/bike)

> version 0.5.3 (stable) - [History](https://github.com/behere/bike/blob/master/HISTORY.md)

# Bike
  
  Organize your classes through namespaces, extend or mix them.
  
  This module can be used `standalone` or inside [behere framework](http://github.com/behere/behere) as `behere.bike`.

## Installation

Install this using `npm` as follows for standalone use

    $ npm install bike

## Quick Start

### Define a class

This will *register* a class.

```javascript
var Bike = require('bike');

Bike.define('animal', {
  move: function(){
    return 'i move'
  }
});

Bike.create('animal').move();
// => 'i move'
```

behere use: `behere.define()`

### Create a class

```javascript
var animal = Bike.create('animal');

animal.move();
// => 'i move'
```

behere use: `behere.create()`

### Extend a class

Extending a class will allow to inherit all the properties and methods from the extended object.
To call the parent method use the `this._super()` syntax.

```javascript
Bike.define('cat', {
  extend: 'animal',
  move: function(){
    return this._super() + ', run and jump'
  }
});

var cat = Bike.create('cat');

cat.move();
// => 'i move, run and jump'
```

### Use namespaces

The namespace will bike you organize classes in a tree structure.

```javascript
Bike.define('animal', {
  /* ... */
});

Bike.define('animal.cat', {
  extend: 'animal'
  /* ... */
});

Bike.define('animal.cat.Sophie', {
  extend: 'animal.cat'
  /* ... */
});

// And more..

Bike.define('animal.dog', {
  extend: 'animal'
  /* ... */
});

Bike.define('Monkey', {  // Monkey is the name of my dog :-)
  extend: 'animal.dog'
  /* ... */
});
```

### Load missing libraries

In most of the cases your code will need to `require` libraries.
With *Bike* what you need to do it so define namespaces and its system location.

```javascript
Bike.namespace('foo', '/my/path/to/it');

Bike.create('foo.animal');
// => this will create a class defined in '/my/path/to/it/animal.js'
```

Works the same extending or mixing:

```javascript
Bike.define('Sophie', {
  extend: 'foo.animal.cat'
});
// => This will extend the class defined in '/my/path/to/it/animal/cat.js'
```

## Features

  * ...

## Running Tests

Install dev dependencies and make tests:

    $ npm install -d
    $ make test

## Contributors

```
Gabriele Di Stefano <gabriele.ds@gmail.com>
```

![Behere Logo](https://github.com/behere/behere.github.com/raw/master/assets/behere_logo.png)

## License 

[The MIT License](https://github.com/behere/bike/blob/master/LICENSE)