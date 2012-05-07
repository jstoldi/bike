var Klass = require('../')
  , assert = require('assert')
  , path = require('path')
  ;


describe('Klass', function(){
  
  /*
   * #attach()
   */

  describe('#attach()', function(){

    var fn = function(){}
      , obj = new fn();
        
    it('should add to an object both functions define and create', function(){
      Klass.attach(obj);
      obj.define.should.be.an.instanceof(Function);
      obj.create.should.be.an.instanceof(Function);
    })
    
    it('should return the given object', function(){
     Klass.attach(obj).create.should.be.an.instanceof(Function);
    })
      
  })
  
  /*
   * #define()
   */
  
  describe('#define(), #create()', function(){    
      
    it('should define a klass in the cache', function(){
      Klass.define('kls_1', {
        ciao: function(){
          return 'hello'
        }
      });
      
      Klass.create('kls_1').ciao().should.equal('hello')
    })
    
    it('should extend a klass from the cache', function(){
      Klass.define('kls_2', {
        extend: 'kls_1',
        ciao: function(){
          return this._super.apply(this, arguments) + ' ciao'
        }
      });
      
      Klass.create('kls_2').ciao().should.equal('hello ciao')
    })
    
    it('should define a class inside an existing namespace', function(){
      Klass.define('kls_2.kls_3', {
        extend: 'kls_2',
        ciao: function(){
          return this._super.apply(this, arguments) + ' hola'
        }
      });
      
      Klass.create('kls_2.kls_3').ciao().should.equal('hello ciao hola')
    })
    
    it('should try to require object if not already defined', function(){
      Klass.namespace('test', path.join(__dirname, 'klasses'))
      Klass.create('test.cat').name().should.equal('animal cat')
    })
    
    it('should mix objects', function(){
      Klass.namespace('test', path.join(__dirname, 'klasses'))
      Klass.create('test.sophie').name().should.equal('Ciao, sono Sophie ! animal cat, very playfull!!')
    })
    
    it('should initialize just once the class', function(){
      Klass.define('count', {
        singleton: true,
        count: '1'
      });
      
      var a = Klass.create('count');
      var b = Klass.create('count');
      
      a.count.should.equal('1');
      b.count.should.equal('1');
      
      a.count = '2';
      
      a.count.should.equal('2');
      b.count.should.equal('2');
    })
    
  })
  
})