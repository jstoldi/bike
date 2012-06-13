/*!
 * Help
 * Copyright(c) 2012 Gabriele Di Stefano <gabriele.ds@gmail.com>
 * MIT Licensed
 */

// if node
var _ = require('underscore')
  ;
// end

/**
 * Help.
 * 
 * @api private
 */

var Help = exports = module.exports = function Help(){
  return Help.attach.apply(Help, arguments);
};

/**
 * Library version.
 * 
 * Returns a string in the form of `n.n.n`.
 * 
 * @type {String}
 * @api public
 */

Help.version = '0.5.0';
  
/**
 * Delimiter used among namespaces.
 * 
 * Default `.`.
 *
 * @type {String}
 * @api public
 */

Help.delimiter = '.';

/**
 * Namespace manager reference.
 *
 * @return {Object}
 * @see help/namespace.js
 * @api public
 */

Help.namespace = require('./help/namespace');

/**
 * Cache manager reference.
 *
 * @return {Object}
 * @see help/cache.js
 * @api public
 */

Help.cache = require('./help/cache');

/**
 * Base object interpolation.
 * 
 * @return {Object}
 * @see help/base.js
 * @api private
 */

Help.base = require('./help/base');;

/**
 * Attaches methods `define` and `create` on a given object.
 *
 * Returns the given object.
 * 
 * @param {Object} target
 * @return {Object}
 * @api public
 */

Help.attach = function(target){
  if(target){
    target.define = Help.define;
    target.create = Help.create;
    target.namespace = Help.namespace;
  }
  
  return Help;
};

/**
 * Defines in the `Help.cache` a new object.
 *
 * Returns the cached object.
 * 
 * @param {String} name
 * @param {Object} options
 * @param {[Function]} callback
 * @return {Object}
 * @api public
 */

Help.define = function(name, plain, options, callback){
  var obj = null
    ;
  
  if(!_.isBoolean(plain)){
    callback = options;
    options = plain;
    plain = false;
  }
  
  if(!plain){
    if(options && options.extend){
      obj = Help.cache.get(options.extend);
      
      delete options.extend;
    }else{
      obj = Help.base;
    }
    
    if(options){
      obj = Help.base.extend(options, obj);
    }
  
    if(options && options.mixins){
      options.mixins.forEach(function(mixin){
        mixin = Help.cache.get(mixin);
        obj = Help.base.mixin(mixin, obj);
      });
      
      delete options.mixins;
    }
    
  }else{
    // plain
    obj = options;
  }
  
  Help.cache.set(name, obj);
  
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

Help.create = function(name, plain, options, callback){
  var obj = Help.cache.get(name)
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
      obj = Help.base.extend(options, obj);
    }
    
    if(isSingleton){
      
      if(_.has(Help.cache.singletons, name)){
        obj = Help.cache.singletons[name];
      }else{
        obj = Help.cache.singletons[name] = Help.base.create.call(obj, options || {});
        
        if(callback){
          callback.apply(obj, [name, options]);
        } 
      }
      
    }else{
      obj = Help.base.create.call(obj, options || {});
      
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