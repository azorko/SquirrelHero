(function(rootObject) {
  var Asteroids = rootObject.Asteroids = rootObject.Asteroids || {};
  
  var Util = Asteroids.Util = Asteroids.Util || {};
  
  Function.prototype.inherits = function(parentClass) {
    function Surrogate() {};
    Surrogate.prototype = parentClass.prototype;
    this.prototype = new Surrogate();
  };
  
  
})(this);
