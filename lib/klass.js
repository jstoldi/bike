/*!
 * Behere - Klass
 * Copyright(c) 2012 Gabriele Di Stefano <gabriele.ds@gmail.com>
 * MIT Licensed
 */

/*!
 * Module dependencies.
 */

var uberproto = require('uberproto')  // Thanks to http://github.com/daffl/uberproto
  ;

/**
 * Klass.
 * 
 * @api private
 */

var Klass = exports = module.exports = function Klass(){};

/**
 * Library version.
 * 
 * Returns a string in the form of `n.n.n`.
 * 
 * @type {String}
 * @api public
 */

Klass.version = '0.4.1';
  
/**
 * Delimiter used among namespaces.
 * 
 * Default `.`.
 *
 * @type {String}
 * @api public
 */

Klass.delimiter = '.';

/**
 * Namespace manager reference.
 *
 * @return {Object}
 * @see namespace.js
 * @api public
 */

Klass.namespace = require('./namespace');

/**
 * Cache manager reference.
 *
 * @return {Object}
 * @see cache.js
 * @api public
 */

Klass.cache = require('./cache');

/**
 * Base object interpolation.
 * 
 * Thanks to uberproto
 * http://github.com/daffl/uberproto
 * 
 * @return {Object}
 * @see http://github.com/daffl/uberproto
 * @api private
 */

Klass.base = uberproto;

/**
 * Attaches methods `define` and `create` on a given object.
 *
 * Returns the given object.
 * 
 * @param {Object} target
 * @return {Object}
 * @api public
 */

Klass.attach = function(target){
  if(target){
    target.define = Klass.define;
    target.create = Klass.create;
  }
  
  return target;
};

/**
 * Defines in the `Klass.cache` a new object.
 *
 * Returns the cached object.
 * 
 * @param {String} name
 * @param {Object} options
 * @param {[Function]} callback
 * @return {Object}
 * @api public
 */

Klass.define = function(name, options, callback){
  var obj = null
    ;
  
  if(options && options.extend){
    obj = Klass.cache.get(options.extend);
    
    delete options.extend;
  }else{
    obj = Klass.base;
  }

  if(options && options.mixins){
    options.mixins.forEach(function(mixin){
      mixin = Klass.cache.get(mixin);
      obj = Klass.base.mixin(mixin, obj);
    });
    
    delete options.mixins;
  }
  
  if(options){
    obj = Klass.base.extend(options, obj);
  }
  
  Klass.cache.set(name, obj);
  
  if(callback){
    callback.apply(obj, [name, options]);
  }
  
  return obj;
};

/**
 * Creates a new object giving a namespace and options
 *
 * Returns the object just created.
 * 
 * @param {String} name
 * @param {Object} options
 * @param {[Function]} callback
 * @return {Object}
 * @api public
 */

Klass.create = function(name, options, callback){
  var obj = Klass.cache.get(name);
  
  if(options){
    obj = Klass.base.extend(options, obj);
  
    obj = Klass.base.create.call(obj, options);
  }else{
    obj = obj.create();
  }
    
  if(callback){
    callback.apply(obj, [name, options]);
  }
  
  return obj;
};
