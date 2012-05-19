/*!
 * Behere
 * Copyright(c) 2012 Gabriele Di Stefano <gabriele.ds@gmail.com>
 * MIT Licensed
 */

// if node
var _ = require('underscore')
  ;
// end

/**
 * Klass.
 * 
 * @api private
 */

var Klass = exports = module.exports = function Klass(){
  return Klass.attach.apply(Klass, arguments);
};

/**
 * Library version.
 * 
 * Returns a string in the form of `n.n.n`.
 * 
 * @type {String}
 * @api public
 */

Klass.version = '0.4.4';
  
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
 * @see klass/namespace.js
 * @api public
 */

Klass.namespace = require('./klass/namespace');

/**
 * Cache manager reference.
 *
 * @return {Object}
 * @see klass/cache.js
 * @api public
 */

Klass.cache = require('./klass/cache');

/**
 * Base object interpolation.
 * 
 * @return {Object}
 * @see klass/base.js
 * @api private
 */

Klass.base = require('./klass/base');;

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
    target.namespace = Klass.namespace;
  }
  
  return Klass;
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

Klass.define = function(name, plain, options, callback){
  var obj = null
    ;
  
  if(!_.isBoolean(plain)){
    callback = options;
    options = plain;
    plain = false;
  }
  
  if(!plain){
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
  }else{
    // plain
    obj = options;
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

Klass.create = function(name, plain, options, callback){
  var obj = Klass.cache.get(name)
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
      obj = Klass.base.extend(options, obj);
    }
    
    if(isSingleton){
      
      if(_.has(Klass.cache.singletons, name)){
        obj = Klass.cache.singletons[name];
      }else{
        obj = Klass.cache.singletons[name] = Klass.base.create.call(obj, options || {});
        
        if(callback){
          callback.apply(obj, [name, options]);
        } 
      }
      
    }else{
      obj = Klass.base.create.call(obj, options || {});
      
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
