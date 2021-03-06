/*!
 * Bike
 * Copyright(c) 2012 Gabriele Di Stefano <gabriele.ds@gmail.com>
 * MIT Licensed
 */

// if node
var _ = require('underscore')
  ;
// end

/**
 * Bike.
 * 
 * @api private
 */

var Bike = exports = module.exports = function Bike(){
  return Bike.attach.apply(Bike, arguments);
};

/**
 * Library version.
 * 
 * Returns a string in the form of `n.n.n`.
 * 
 * @type {String}
 * @api public
 */

Bike.version = '0.5.3';
  
/**
 * Delimiter used among namespaces.
 * 
 * Default `.`.
 *
 * @type {String}
 * @api public
 */

Bike.delimiter = '.';

/**
 * Namespace manager reference.
 *
 * @return {Object}
 * @see bike/namespace.js
 * @api public
 */

Bike.namespace = require('./bike/namespace');

/**
 * Cache manager reference.
 *
 * @return {Object}
 * @see bike/cache.js
 * @api public
 */

Bike.cache = require('./bike/cache');

/**
 * Base object interpolation.
 * 
 * @return {Object}
 * @see bike/base.js
 * @api private
 */

Bike.base = require('./bike/base');;

/**
 * Attaches methods `define` and `create` on a given object.
 *
 * Returns the given object.
 * 
 * @param {Object} target
 * @return {Object}
 * @api public
 */

Bike.attach = Bike.extend = function(target, namespaces){
  target = target || {};
  
  target.define = Bike.define;
  target.create = Bike.create;
  target.namespace = Bike.namespace;
  
  if(namespaces){
    Bike.namespace(namespaces);
  }
  
  return target;
};

/**
 * Defines in the `Bike.cache` a new object.
 *
 * Returns the cached object.
 * 
 * @param {String} name
 * @param {Object} options
 * @param {[Function]} callback
 * @return {Object}
 * @api public
 */

Bike.define = function(name, plain, options, callback){
  var obj = null
    ;
  
  if(!_.isBoolean(plain)){
    callback = options;
    options = plain;
    plain = false;
  }
  
  if(!plain){
    if(options && options.extend){
      obj = Bike.cache.get(options.extend);
      
      delete options.extend;
    }else{
      obj = Bike.base;
    }
    
    if(options){
      obj = Bike.base.extend(options, obj);
    }
  
    if(options && options.mixins){
      options.mixins.forEach(function(mixin){
        mixin = Bike.cache.get(mixin);
        obj = Bike.base.mixin(mixin, obj);
      });
      
      delete options.mixins;
    }
    
  }else{
    // plain
    obj = options;
  }
  
  Bike.cache.set(name, obj);
  
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

Bike.create = function(name, plain, options, callback){
  var obj = Bike.cache.get(name)
    , isSingleton = false
    ;
  
  if(!_.isBoolean(plain)){
    callback = options;
    options = plain;
    plain = false;
  }
  
  if(!plain){
    if((obj && obj.hasOwnProperty('singleton') && obj.singleton) || (options && options.singleton)){
      isSingleton = true;
    }
    
    if(options){
      obj = Bike.base.extend(options, obj);
    }
    
    if(isSingleton){
      
      if(_.has(Bike.cache.singletons, name)){
        obj = Bike.cache.singletons[name];
      }else{
        obj = Bike.cache.singletons[name] = Bike.base.create.call(obj, options || {});
        
        if(callback){
          callback.apply(obj, [name, options]);
        } 
      }
      
    }else{
      obj = Bike.base.create.call(obj, options || {});
      
      if(callback){
        callback.apply(obj, [name, options]);
      } 
    }
  }else{
    // plain
    obj = new obj();
  }
  
  return obj;
};