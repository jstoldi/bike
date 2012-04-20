/*!
 * Behere - Klass
 * Copyright(c) 2012 Gabriele Di Stefano <gabriele.ds@gmail.com>
 * MIT Licensed
 */


/**
 * Module dependencies
 */
var Klass = require('./klass')
  , path = require('path')
  , _ = require('underscore')
  ;


/**
 * Cache
 *
 * @param {String} name
 * @param {*} value
 * @return {value|items}
 * @api public
 */
var Cache = module.exports = function(name, value){
  if(!value && name){
    value = Cache.get(name);
    return value
  }else if(value && name){
    return Cache.set.apply(this, arguments)
  }
  
  return Cache.items
};


/**
 * items
 *
 * @api public
 */
Cache.items = {};


/**
 * get
 *
 * @param {String} name
 * @return {*|null}
 * @api public
 */
Cache.get = function(name){
  if(!_.isString(name)) return name.prototype;
  
  var parent = Cache.items
    ,  seed = null
    ,  seeds = name.split('.')
    ,  name = _.last(seeds)
    ;
  
  for(var i = 0; i < seeds.length-1; i++){
    seed = seeds[i];
    
    if(!parent[seed]){
      Cache.require( seeds );
    };

    parent = parent[seed];
  };
  
  if(!parent[name]) {
    Cache.require( seeds );
  }
  
  return parent[name] ? parent[name]._klass : null
};


/**
 * set
 *
 * @param {String} name
 * @param {*} value
 * @return {value|null}
 * @api public
 */
Cache.set = function(name, value){

  var parent = Cache.items
    ,  seed = null
    ,  seeds = name.split('.')
    ,  name = _.last(seeds)
    ;

  for(var i = 0; i < seeds.length-1; i++){
    seed = seeds[i];
    
    if(!parent[seed]){
      parent[seed] = {
        _name: null,
        _klass: null
      };
    };
    parent = parent[seed];
    
  };

  if(parent[name]){
    parent[name]._name = name;
    parent[name]._klass = value;
  }else{
    parent[name] = {
      _name: name,
      _klass: value
    }
  }
  
  return parent[name]._klass
};


/**
 * remove **TO BE IMPLEMENTED
 *
 * @param {String} name
 * @return {items}
 * @api public
 */
Cache.remove = function(name){
  
  // NEED TO CLEAR ALSO THE CACHE OF nodejs require
  // with the "may" required cached object
  // so it will be reloaded
  // because otherwise the define function wont run again 
  
  return Cache.items
};


/**
 * clear
 *
 * @return {items}
 * @api public
 */
Cache.clear = function(){
  return Cache.items = {}
};


/**
 * require
 *
 * @param {String} name
 * @return {*}
 * @api private
 */
Cache.require = function(name){
  var seeds = null
    ,  link = null
    ;
  
  if(_.isArray(name)){
    seeds = name;
    name = name.join('.');  
  }else{
    seeds = name.split('.');
  }
  
  link = Klass.namespace.get(name);
  
  if(!link){
    return false
  }

  return require(path.join(
    link.target,
    _.last(seeds, (seeds.length - link.name.split('.').length)).join('/')
  ))
};
