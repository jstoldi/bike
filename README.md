> ![Stage](https://github.com/behere/behere.github.com/raw/master/assets/stage/production.png)  
[![Build Status](https://secure.travis-ci.org/behere/bike.png)](http://travis-ci.org/behere/bike)

> version 0.5.4 (stable) - [History](https://github.com/behere/bike/blob/master/HISTORY.md)

# Bike
  
  Organize your classes in namespaces, extend or mix them. Bike helps you keep your project clear and in order.
  
  This module can be used with `node` or in the `browser`.

## Features
  
  * namespaces
  * extend (inheritance like)
  * mixin
  * super methods
  * self require dependencies
  * cache

## Installation

Install this using `npm` as follows

    $ npm install bike

## Quick start

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

Optionally you can also give properies or methods that will extend the new object just created, not its definition.

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
// => I can sing songs
```

### Define namespaces

The namespace will help you organize classes in a tree structure.

```javascript
Bike.namespace('people', __dirname + '/jobs');
```

Now when you create a class `people.*` it will automatically require it from the folder `/jobs`.

```javascript
Bike.define('people.architect', {
  /* ... */
});
// => will look for '/jobs/architect.js'

// OR

Bike.define('people.architect', {
  extend: 'people.general.worker'
});
// => will look for '/jobs/architect.js' extending '/jobs/general/worker.js'
// No need to require('/jobs/architect.js') or not require('/jobs/general/worker.js')
```

### Mixing classes

You could also borrow properties or methods from other classes beside direct extending

```javascript
Bike.define('people.architect', {
  mixins: [
    'people.general.engineer',
    'freetime.runner'
  ]
});
```

### Extend your own class with Bike

It is possible to extend your own class/module/project with Bike's functionality.

```javascript
var myClass = function(){/**/};
myClass.version = '0.0.0';
myClass.ciao = function(){};

/* ... */

Bike.extend(myClass);

// Now you can do
myClass.define('...', {});
// and
myClass.create('...');

// Optionally you can also pass namespaces directly into the extend fn
Bike.extend(myClass, {
  'people', __dirname + '/jobs'
})
```

## Running Tests

Install dev dependencies and make tests:

    $ npm install -d
    $ make test

## Contributors

```
Gabriele Di Stefano <gabriele.ds@gmail.com>
```
[![endorse](http://api.coderwall.com/gabrieleds/endorsecount.png)](http://coderwall.com/gabrieleds)

![Behere Logo](https://github.com/behere/behere.github.com/raw/master/assets/behere_logo.png)

## License 

[The MIT License](https://github.com/behere/bike/blob/master/LICENSE)