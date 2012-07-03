> ![Stage](https://github.com/behere/behere.github.com/raw/master/assets/stage/production.png)  
[![Build Status](https://secure.travis-ci.org/behere/bike.png)](http://travis-ci.org/behere/bike)

> version 0.5.3 (stable) - [History](https://github.com/behere/bike/blob/master/HISTORY.md)

# Bike
  
  Organize your classes in namespaces, extend or mix them. Bike helps you keep your project in order.
  
  This module can be used with `node` or in the `browser`.

## Features
  
  * namespaces
  * extend (inheritance like)
  * mixin
  * super methods
  * self require dependencies
  * cache

  * extjs like syntax

## Installation

Install this using `npm` as follows for standalone use

    $ npm install bike

## Quick Start

### Define a class

This will *register* a class.

```javascript
var Bike = require('bike');

Bike.define('person', {
  talk: function(){
    return 'Ciao, i am a person'
  }
});
```

### Create a class

This will *instantiate* a new object.

```javascript
var person = Bike.create('person');

person.talk();
// => Ciao, i am a person
```

### Extend a class

Extending a class will allow to inherit all properties and methods from the extended object.

To call the parent method use the `this._super()` syntax.

```javascript
Bike.define('singer', {
  extend: 'person',
  talk: function(){
    return this._super() + ' and a good singer!'
  },
  sing: function(){
    return 'I can sing'
  }
});

var singer = Bike.create('singer');

singer.talk();
// => Ciao, i am a person and a good singer!
```

Optionally you can also give properies or methods that will extend the new object just created. Not its definition.

```javascript
var frank = Bike.create('singer', {
  name: 'Frank',
  sing: function(){
    return this._super() + ' songs.'
  }
});

frank.name;
// => Frank

frank.sing();
// => I can sing songs.
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