(function (rootObject){
  var Asteroids = rootObject.Asteroids = rootObject.Asteroids || {};
  
  var Bullet = Asteroids.Bullet = function () { //will take in vel
    Asteroids.MovingObject.call(this, arguments);
    this.radius = 20;
		this.image = new Image();
		this.image.src = 'https://s3-us-west-1.amazonaws.com/krazysquirrelz/acorn.png';
  };
  
  Bullet.inherits(Asteroids.MovingObject);
  
})(this);