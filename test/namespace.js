var Klass = require('../')
  , assert = require('assert')
  ;


describe('Klass', function(){
  
  /*
   * #namespace()
   */
  describe('#namespace()', function(){
    
    
    it('should return an array', function(){    
      Klass.namespace().should.be.an.instanceof(Array);
    })
    
    
    it('should set namespaces with name and target properties', function(){
      var ns = Klass.namespace('foo', '-/foo/-');
      ns.should.be.a('object');
      ns.should.have.property('name', 'foo');
      ns.should.have.property('target', '-/foo/-');
    })
    
    
    it('should override the target if the name already exist', function(){
      var ns = Klass.namespace('foo', 'foo---');
      ns.should.be.a('object');
      ns.should.have.property('name', 'foo');
      ns.should.have.property('target', 'foo---');
    })
    
    
    it('should return the target related to the given name', function(){
      var ns = Klass.namespace('sophie', 'cat');
      Klass.namespace('sophie').should.equal('cat');
    })
    

    describe('#clear()', function(){
  
  
      it('should clear namespace and return an array', function(){
        Klass.namespace.clear();
        Klass.namespace('foo', '-/foo/-');
        Klass.namespace().should.be.an.instanceof(Array).with.lengthOf(1);
        Klass.namespace.clear().should.be.an.instanceof(Array).with.lengthOf(0);
        Klass.namespace().should.be.an.instanceof(Array).with.lengthOf(0);
      })
        
  
    })
    

    describe('#remove()', function(){
      
      
      it('should return the items', function(){
        Klass.namespace.remove().should.be.an.instanceof(Array);
      })
      
      
      it('should remove a give item and return items', function(){
        Klass.namespace.clear();
        
        Klass.namespace.set('meme','cat white');
        Klass.namespace.set('sophie','cat orange');
        
        Klass.namespace().should.be.an.instanceof(Array).with.lengthOf(2);
        Klass.namespace.remove('sophie').should.be.an.instanceof(Array);
        Klass.namespace().should.be.an.instanceof(Array).with.lengthOf(1);
      })
      
  
    })
    
    
  })
  
  
})