(function(rootObject) {
  var SquirrelHero = rootObject.SquirrelHero = rootObject.SquirrelHero || {};
  
  var Util = SquirrelHero.Util = SquirrelHero.Util || {};
  
  Function.prototype.inherits = function(parentClass) {
    function Surrogate() {};
    Surrogate.prototype = parentClass.prototype;
    this.prototype = new Surrogate();
  };
  
  
})(this);
