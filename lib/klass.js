/*!
 * Behere - Klass
 * Copyright(c) 2012 Gabriele Di Stefano <gabriele.ds@gmail.com>
 * MIT Licensed
 */


/**
 * Module dependencies
 */
var uberproto = require('uberproto')
  ;
  

/**
 * Application prototype
 */
var Klass = module.exports = {};


/**
 * namespace
 *
 * @return {Namespace}
 * @api public
 */
Klass.namespace = require('./namespace');


/**
 * cache
 *
 * @return {Cache}
 * @api public
 */
Klass.cache = require('./cache');


/**
 * base
 *
 * @return {Uberproto}
 * @api private
 * 
 * Thanks to uberproto
 * http://github.com/daffl/uberproto
 */
Klass.base = uberproto;


/**
 * attach
 *
 * @param {Object} target
 * @return {target}
 * @api public
 */
Klass.attach = function(target){
  if(target){
    target.define = Klass.define;
    target.create = Klass.create;
  }
  
  return target
};


/**
 * define
 *
 * @param {Object} name
 * @param {Object} options
 * @param {Object} callback
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
      mixin = Klass.cache.get(mixin)
      obj = Klass.base.mixin(mixin, obj)
    });
    
    delete options.mixins;
  }
  
  if(options){
    obj = Klass.base.extend(options, obj)
  }
  
  Klass.cache.set(name, obj);
  
  if(callback){
    callback.apply(obj, [name, options]);
  }
  
  return obj
};


/**
 * create
 *
 * @param {Object} name
 * @param {Object} options
 * @param {Object} callback
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
  
  return obj
};


