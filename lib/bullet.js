(function (rootObject){
  var Asteroids = rootObject.Asteroids = rootObject.Asteroids || {};
  
  var Bullet = Asteroids.Bullet = function () { //will take in vel
    Asteroids.MovingObject.call(this, arguments);
    this.radius = Bullet.RADIUS;
    this.color = Bullet.COLOR;
  };
  
  Bullet.inherits(Asteroids.MovingObject);
  
  Bullet.COLOR = "blue";
  Bullet.RADIUS = 2;
  
})(this);