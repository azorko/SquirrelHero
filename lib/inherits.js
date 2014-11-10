
Function.prototype.inherits = function(parentClass) {
  function Surrogate() {};
  Surrogate.prototype = parentClass.prototype;
  this.prototype = new Surrogate();
};
function MovingObject() {
};


MovingObject.prototype.fly = function() {console.log("IM FLYING!")};



function Ship() {};
Ship.inherits(MovingObject);


s = new Ship();

s.fly();