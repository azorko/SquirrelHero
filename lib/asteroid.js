(function (rootObject){
  var Asteroids = rootObject.Asteroids = rootObject.Asteroids || {};
  
  var Asteroid = Asteroids.Asteroid = function () {
    Asteroids.MovingObject.call(this, arguments);
    this.radius = Asteroid.RADIUS;
    this.color = Asteroid.COLOR;
    this.vel = [];
    var min = 1;
    var max = 2;
    this.vel[0] = Math.floor(Math.random() * (max - min) - min);
    this.vel[1] = Math.floor(Math.random() * (max - min) - min);
  };
  
  Asteroid.inherits(Asteroids.MovingObject);
  
  Asteroid.COLOR = "#cccccc";
  Asteroid.RADIUS = 10;
  
})(this);