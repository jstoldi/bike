> ![Stage](https://github.com/behere/behere.github.com/raw/master/assets/stage/production.png)  
[![Build Status](https://secure.travis-ci.org/behere/help.png)](http://travis-ci.org/behere/help)

> version 0.4.5 (stable) - [History](https://github.com/behere/help/blob/master/HISTORY.md)

# Help
  
  Organize your classes through namespaces, extend or mix them.
  
  This module can be used `standalone` or inside [behere framework](http://github.com/behere/behere) as `behere.help`.

## Installation

Install this using `npm` as follows for standalone use

    $ npm install help

## Quick Start

### Define a class

This will *register* a class.

```javascript
var Help = require('help');

Help.define('animal', {
  move: function(){
    return 'i move'
  }
});

Help.create('animal').move();
// => 'i move'
```

behere use: `behere.define()`

### Create a class

```javascript
var animal = Help.create('animal');

animal.move();
// => 'i move'
```

behere use: `behere.create()`

### Extend a class

Extending a class will allow to inherit all the properties and methods from the extended object.
To call the parent method use the `this._super()` syntax.

```javascript
Help.define('cat', {
  extend: 'animal',
  move: function(){
    return this._super() + ', run and jump'
  }
});

var cat = Help.create('cat');

cat.move();
// => 'i move, run and jump'
```

### Use namespaces

The namespace will help you organize classes in a tree structure.

```javascript
Help.define('animal', {
  /* ... */
});

Help.define('animal.cat', {
  extend: 'animal'
  /* ... */
});

Help.define('animal.cat.Sophie', {
  extend: 'animal.cat'
  /* ... */
});

// And more..

Help.define('animal.dog', {
  extend: 'animal'
  /* ... */
});

Help.define('Monkey', {  // Monkey is the name of my dog :-)
  extend: 'animal.dog'
  /* ... */
});
```

### Load missing libraries

In most of the cases your code will need to `require` libraries.
With *Help* what you need to do it so define namespaces and its system location.

```javascript
Help.namespace('foo', '/my/path/to/it');

Help.create('foo.animal');
// => this will create a class defined in '/my/path/to/it/animal.js'
```

Works the same extending or mixing:

```javascript
Help.define('Sophie', {
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

[The MIT License](https://github.com/behere/help/blob/master/LICENSE)