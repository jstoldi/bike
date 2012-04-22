/*!
 * Behere - Klass, namespace
 * Copyright(c) 2012 Gabriele Di Stefano <gabriele.ds@gmail.com>
 * MIT Licensed
 */

/**
 * Module dependencies.
 */

var _ = require('underscore')
  ;

/**
 * Namespace.
 *
 * @param {String} name
 * @param {*} value
 * @return {value|items}
 * @api public
 */

var Namespace = exports = module.exports = function Namespace(name, value){
  if(!value && name){
    value = exports.get(name);
    return value ? value.target : null;
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

exports.items = [];

/**
 * get.
 *
 * @param {String} name
 * @return {*|null}
 * @api public
 */

exports.get = function(name){
  return _.find(exports.items.sort(function(first, second){
    return second.name.length - first.name.length;
  }), function(link){
    return (name.indexOf(link.name) != -1);
  });
  
  return null;
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
  var ns = null;
  
  if(!_.find(exports.items, function(ns){
    return ns.name === name;
  })){
    ns = exports.items[exports.items.push({
      name: name,
      target: value
    }) - 1];
  }else{
    ns = exports.get(name);
    ns.target = value;
  }
  
  return ns;
};

/**
 * remove.
 *
 * @param {String} name
 * @return {items}
 * @api public
 */

exports.remove = function(name){
  return exports.items = _.reject(exports.items, function(ns){
    return ns.name == name;
  });
};

/**
 * clear.
 *
 * @return {items}
 * @api public
 */

exports.clear = function(){
  return exports.items = [];
};
