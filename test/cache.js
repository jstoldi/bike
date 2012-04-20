var Klass = require('../')
  , assert = require('assert')
  ;


describe('Klass', function(){
  
  /*
   * #cache()
   */
  describe('#cache()', function(){
      
      
    it('should return an object', function(){    
      Klass.cache().should.be.an.instanceof(Object);
    })
    
    
    it('should set cache with name and object properties', function(){
      var cc = Klass.cache('foo.1.2.3', '-/foo/-');
      cc.should.be.a('string').equal('-/foo/-');
    })
    
    
    it('should override the object if the name already exist', function(){
      var cc = Klass.cache('foo.1.2.3', '123');
      cc.should.be.a('string').equal('123');
    })
    
    
    it('should return the target related to the given name', function(){
      Klass.cache('foo.1.2.3.4', 'cat');
      Klass.cache('foo.1.2.3.4').should.equal('cat');
    })
    
  
    describe('#clear()', function(){

  
      it('should clear cache and return an empty object', function(){
        Klass.cache.clear();
        Klass.cache('foo', {aa:'aa'});
        Klass.cache().should.be.an.instanceof(Object).have.property('foo');
        Klass.cache.clear().should.be.an.instanceof(Object).eql({});
        Klass.cache().should.be.an.instanceof(Object).eql({});
      })
        
  
    })
    

    describe('#remove()', function(){
      // TO BE IMPLEMENTED
  
    })
    
    
  })
  
  
})