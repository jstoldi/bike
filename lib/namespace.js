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
 * Namespace
 *
 * @param {String} name
 * @param {*} value
 * @return {value|items}
 * @api public
 */
var Ns = module.exports = function(name, value){
  if(!value && name){
    value = Ns.get(name);
    return value ? value.target : null  
  }else if(value && name){
    return Ns.set.apply(this, arguments)
  }
  
  return Ns.items
};


/**
 * items
 *
 * @api public
 */
Ns.items = [];


/**
 * get
 *
 * @param {String} name
 * @return {*|null}
 * @api public
 */
Ns.get = function(name){
  return _.find(Ns.items.sort(function(first, second){
    return second.name.length - first.name.length
  }), function(link){
    return (name.indexOf(link.name) != -1)
  })
  
  return null
};


/**
 * set
 *
 * @param {String} name
 * @param {*} value
 * @return {value|null}
 * @api public
 */
Ns.set = function(name, value){
  var ns = null;
  
  if(!_.find(Ns.items, function(ns){
    return ns.name === name
  })){
    ns = Ns.items[Ns.items.push({
      name: name,
      target: value
    }) - 1]
  }else{
    ns = Ns.get(name);
    ns.target = value;
  }
  
  return ns
};


/**
 * remove
 *
 * @param {String} name
 * @return {items}
 * @api public
 */
Ns.remove = function(name){
  return Ns.items = _.reject(Ns.items, function(ns){
    return ns.name == name;
  })
};


/**
 * clear
 *
 * @return {items}
 * @api public
 */
Ns.clear = function(){
  return Ns.items = []
};

