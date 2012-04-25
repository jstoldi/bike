> ![Stage](https://github.com/behere/behere.github.com/raw/master/assets/stage/production.png)  
[![Build Status](https://secure.travis-ci.org/behere/behere-klass.png)](http://travis-ci.org/behere/behere-klass)

> version 0.4.2 (stable) - [History](https://github.com/behere/behere-klass/blob/master/HISTORY.md)

# Klass
  
  Organize your classes through namespaces, extend or mix them.
  
  This module can be used `standalone` or inside [behere framework](http://github.com/behere/behere) as `behere.klass`.

## Installation

Install this using `npm` as follows for standalone use

    $ npm install behere-klass

## Quick Start

### Define a class

This will *register* a class.

    var Klass = require('behere-klass');
    
    Klass.define('animal', {
      move: function(){
        return 'i move'
      }
    });
    
    Klass.create('animal').move();
      // => i move

behere use: `behere.define()`

### Create a class

    var animal = Klass.create('animal');
    
    animal.move();
      // => i move

behere use: `behere.create()`

### Extend a class

Extending a class will allow to inherit all the properties and methods from the extended object.
To call the parent method use the `this._super()` syntax.

    Klass.define('cat', {
      extend: 'animal',
      move: function(){
        return this._super() + ', run and jump'
      }
    });
    
    var cat = Klass.create('cat');
    
    cat.move();
      // => i move, run and jump'

### Use namespaces

The namespace will help you organize classes in a tree structure.

    Klass.define('animal', {
      /* ... */
    });
    
    Klass.define('animal.cat', {
      extend: 'animal'
      /* ... */
    });
    
    Klass.define('animal.cat.Sophie', {
      extend: 'animal.cat'
      /* ... */
    });
    
    // And more..
    
    Klass.define('animal.dog', {
      extend: 'animal'
      /* ... */
    });
    
    Klass.define('Monkey', {  // Monkey is the name of my dog :-)
      extend: 'animal.dog'
      /* ... */
    });

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

[The MIT License](https://github.com/behere/behere-klass/blob/master/LICENSE)