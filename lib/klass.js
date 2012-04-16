/*
 * behere-klass/klass.js
 *
 * behere.eu
 */


var util = require('util')
  ,  path = require('path')
  ,  _ = require('underscore')
  , Klass = module.exports = {}
  ;
  

/**
 * @method namespace
 */
Klass.namespace = function(name, target){
  setNamespace.apply(this, arguments)
};


/**
 * @method attach
 */
Klass.attach = function(target){
  if(target){
    target.define = Klass.define;
    target.create = Klass.create;
  }
  
  return Klass
};


/**
 * @method define
 */
Klass.define = function(name, options, callback){
  var obj = null
    ;
  
  if(options && options.extend){
    obj = getObject(options.extend);
    
    delete options.extend;
  }else{
    obj = Base;
  }

  if(options && options.mixins){
    options.mixins.forEach(function(mixin){
      mixin = getObject(mixin)
      obj = Base.mixin(mixin, obj)
    });
    
    delete options.mixins;
  }
  
  if(options){
    obj = Base.extend(options, obj)
  }
  
  setObject(name, obj);
  
  if(callback){
    callback.apply(obj, [name, options]);
  }
  
  return obj
};


/**
 * @method create
 */
Klass.create = function(name, options, callback){
  var obj = getObject(name);
  
  if(options){
    obj = Base.extend(options, obj)
  }
  
  obj = obj.create();
  
  if(callback){
    callback.apply(obj, [name, options]);
  }
  
  return obj
};


/**
 * @property Base
 * @private
 */
var Base = require('uberproto');


/**
 * @property Cache
 * @private
 */
var Cache = {};


/**
 * @property Namespaces
 * @private
 */
var Namespaces = [];


/**
 * @method getObject
 * @private
 */
function getObject(name){
  if(!_.isString(name)) return name.prototype;
  
  var parent = Cache
    ,  seed = null
    ,  seeds = name.split('.')
    ,  name = _.last(seeds)
    ;
  
  for(var i = 0; i < seeds.length-1; i++){
    seed = seeds[i];
    
    if(!parent[seed]){
      requireObject( seeds );
    };

    parent = parent[seed];
  };
  
  if(!parent[name]) {
    requireObject( seeds );
  }
  
  return parent[name]._klass
};


/**
 * @method setObject
 * @private
 */
function setObject(name, value){

  var parent = Cache
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
};


/**
 * @method requireObject
 * @private
 */
function requireObject(name){
  var seeds = null
    ,  link = null
    ;
  
  if(_.isArray(name)){
    seeds = name;
    name = name.join('.');  
  }else{
    seeds = name.split('.');
  }
  
  link = getNamespace(name);
  
  if(!link){
    return false
  }

  return require(path.join(
    link.target,
    _.last(seeds, (seeds.length - link.name.split('.').length)).join('/')
  ))
};


/**
 * @method setNamespace
 * @private
 */
function setNamespace(name, target){
  if(!_.include(Namespaces, name)){
    Namespaces.push({
      name: name,
      target: target
    })
  }
};


/**
 * @method getNamespace
 * @private
 */
function getNamespace(name){
  return _.find(Namespaces.sort(function(first, second){
    return second.name.length - first.name.length
  }), function(link){
    return (name.indexOf(link.name) != -1)
  })
};

