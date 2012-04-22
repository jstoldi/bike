/*!
 * Behere - Klass, cache
 * Copyright(c) 2012 Gabriele Di Stefano <gabriele.ds@gmail.com>
 * MIT Licensed
 */

/**
 * Module dependencies.
 */

var _ = require('underscore')
  , path = require('path')
  , klass = require('./klass')
  , namespace = require('./namespace')
  ;

/**
 * Cache.
 *
 * @param {String} name
 * @param {*} value
 * @return {value|items}
 * @api public
 */

var Cache = exports = module.exports = function Cache(name, value){
  if(!value && name){
    value = exports.get(name);
    return value;
  }else if(value && name){
    return exports.set.apply(this, arguments);
  }
  
  return exports.items;
};

/**
 * items.
 *
 * @api public
 */

exports.items = {};

/**
 * get.
 *
 * @param {String} name
 * @return {*|null}
 * @api public
 */

exports.get = function(name){
  if(!_.isString(name)) return name.prototype;
  
  var parent = exports.items
    ,  seed = null
    ,  seeds = name.split(klass.delimiter)
    ,  name = _.last(seeds)
    ;
  
  for(var i = 0; i < seeds.length-1; i++){
    seed = seeds[i];
    
    if(!parent[seed]){
      exports.require( seeds );
    };

    parent = parent[seed];
  };
  
  if(!parent[name]) {
    exports.require( seeds );
  }
  
  return parent[name] ? parent[name]._klass : null;
};

/**
 * set.
 *
 * @param {String} name
 * @param {*} value
 * @return {value|null}
 * @api public
 */

exports.set = function(name, value){

  var parent = exports.items
    ,  seed = null
    ,  seeds = name.split(klass.delimiter)
    ,  name = _.last(seeds)
    ;

  for(var i = 0; i < seeds.length-1; i++){
    seed = seeds[i];
    
    if(!parent[seed]){
      parent[seed] = {
        _name: null,
        _klass: null
      };
    }
    parent = parent[seed];
  };

  if(parent[name]){
    parent[name]._name = name;
    parent[name]._klass = value;
  }else{
    parent[name] = {
      _name: name,
      _klass: value
    };
  }
  
  return parent[name]._klass;
};

/**
 * remove **TO BE IMPLEMENTED.
 *
 * @param {String} name
 * @return {items}
 * @api public
 */

exports.remove = function(name){
  
  // NEED TO CLEAR ALSO THE CACHE OF nodejs require
  // with the "may" required cached object
  // so it will be reloaded
  // because otherwise the define function wont run again 
  
  return exports.items;
};

/**
 * clear.
 *
 * @return {items}
 * @api public
 */

exports.clear = function(){
  return exports.items = {};
};

/**
 * require.
 *
 * @param {String} name
 * @return {*}
 * @api private
 */

exports.require = function(name){
  var seeds = null
    ,  link = null
    ;
  
  if(_.isArray(name)){
    seeds = name;
    name = name.join(klass.delimiter);  
  }else{
    seeds = name.split(klass.delimiter);
  }
  
  link = namespace.get(name);
  
  if(!link){
    return false;
  }

  return require(path.join(
    link.target,
    _.last(seeds, (seeds.length - link.name.split(klass.delimiter).length)).join('/')
  ));
};
