/*!
 * Behere - Klass
 * Copyright(c) 2012 Gabriele Di Stefano <gabriele.ds@gmail.com>
 * MIT Licensed
 */

/**
 * Module dependencies.
 */

var uberproto = require('uberproto')  // Thanks to http://github.com/daffl/uberproto
  ;
  
/**
 * Library version.
 */

exports.version = '0.4.0';
  
/**
 * Delimiter.
 */

exports.delimiter = '.';

/**
 * namespace.
 *
 * @return {Namespace}
 * @api public
 */

exports.namespace = require('./namespace');

/**
 * cache.
 *
 * @return {Cache}
 * @api public
 */

exports.cache = require('./cache');

/**
 * base.
 *
 * @return {Uberproto}
 * @api private
 * 
 * Thanks to uberproto
 * http://github.com/daffl/uberproto
 */

exports.base = uberproto;

/**
 * attach.
 *
 * @param {Object} target
 * @return {target}
 * @api public
 */

exports.attach = function(target){
  if(target){
    target.define = exports.define;
    target.create = exports.create;
  }
  
  return target;
};

/**
 * define.
 *
 * @param {Object} name
 * @param {Object} options
 * @param {Object} callback
 * @return {Object}
 * @api public
 */

exports.define = function(name, options, callback){
  var obj = null
    ;
  
  if(options && options.extend){
    obj = exports.cache.get(options.extend);
    
    delete options.extend;
  }else{
    obj = exports.base;
  }

  if(options && options.mixins){
    options.mixins.forEach(function(mixin){
      mixin = exports.cache.get(mixin);
      obj = exports.base.mixin(mixin, obj);
    });
    
    delete options.mixins;
  }
  
  if(options){
    obj = exports.base.extend(options, obj);
  }
  
  exports.cache.set(name, obj);
  
  if(callback){
    callback.apply(obj, [name, options]);
  }
  
  return obj;
};

/**
 * create.
 *
 * @param {Object} name
 * @param {Object} options
 * @param {Object} callback
 * @return {Object}
 * @api public
 */

exports.create = function(name, options, callback){
  var obj = exports.cache.get(name);
  
  if(options){
    obj = exports.base.extend(options, obj);
  
    obj = exports.base.create.call(obj, options);
  }else{
    obj = obj.create();
  }
    
  if(callback){
    callback.apply(obj, [name, options]);
  }
  
  return obj;
};
