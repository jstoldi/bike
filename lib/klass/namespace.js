/*!
 * Behere
 * Copyright(c) 2012 Gabriele Di Stefano <gabriele.ds@gmail.com>
 * MIT Licensed
 */

/*!
 * Module dependencies.
 */

var _ = require('underscore')
  ;

/**
 * Manager and placeholder of the namespace object.
 * 
 * Examples:
 * 
 *    Klass.namespace()
 *      // get all
 *      // => []
 * 
 *    Klass.namespace('foo')
 *      // get
 *      // => String
 * 
 *    Klass.namespace('foo', './my/path/to/it')
 *      // set
 *      // => String
 *
 * @param {[String]} name
 * @param {[String]} value
 * @return {String}
 * @api public
 */

var Namespace = function Namespace(name, value){
  if(!value && name){
    value = Namespace.get(name);
    return value ? value.target : null;
  }else if(value && name){
    return Namespace.set.apply(this, arguments);
  }
  
  return Namespace.items;
};

/**
 * Namespace container.
 *
 * @type {Array}
 * @api private
 */

Namespace.items = [];

/**
 * Get the target of a given namespace.
 *
 * @param {String} name
 * @return {String|null}
 * @api public
 */

Namespace.get = function(name){
  return _.find(Namespace.items.sort(function(first, second){
    return second.name.length - first.name.length;
  }), function(link){
    return (name.indexOf(link.name) != -1);
  });
  
  return null;
};

/**
 * Add or replace a target of a given namespace.
 *
 * Returns the give target;
 * 
 * @param {String} name
 * @param {String} value
 * @return {String}
 * @api public
 */

Namespace.set = function(name, value){
  var ns = null;
  
  if(!_.find(Namespace.items, function(ns){
    return ns.name === name;
  })){
    ns = Namespace.items[Namespace.items.push({
      name: name,
      target: value
    }) - 1];
  }else{
    ns = Namespace.get(name);
    ns.target = value;
  }
  
  return ns;
};

/**
 * Removes a namespace.
 * 
 * Returns the namespace container.
 *
 * @param {String} name
 * @return {Array}
 * @api public
 */

Namespace.remove = function(name){
  return Namespace.items = _.reject(Namespace.items, function(ns){
    return ns.name == name;
  });
};

/**
 * Empty the namespace container and returns it.
 *
 * @return {Array}
 * @api public
 */

Namespace.clear = function(){
  return Namespace.items = [];
};

/*!
 * Exports.
 */

exports = module.exports = Namespace;
