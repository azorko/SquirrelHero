(function (rootObject) {
  var Asteroids = rootObject.Asteroids = rootObject.Asteroids || {};
  
  var Ship = Asteroids.Ship = function() {
    Asteroids.MovingObject.call(this, arguments);
    this.color = Ship.COLOR;
    this.radius = Ship.RADIUS;
    this.vel = [0, 0];
  };
  
  Ship.inherits(Asteroids.MovingObject);
  
  Ship.COLOR = "red";
  Ship.RADIUS = "10";
  
  Ship.prototype.relocate = function () {
    this.pos = Asteroids.Game.randomPos();
    this.vel = [0, 0];
  };
  
  Ship.prototype.power = function(impulse) {
    this.vel[0] += impulse[0];
    this.vel[1] += impulse[1];
    console.log(this.vel);
  };

})(this); 
  
  
  