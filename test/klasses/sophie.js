var Klass = require('../../')
  ;

Klass.define('test.sophie', {
  extend: 'test.cat',
  mixins: [
    'test.playfull'
  ],
  name: function(){
    return 'Ciao, sono Sophie ! ' + this._super.apply(this, arguments);
  }
});