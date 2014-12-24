(function (rootObject) {
  var Asteroids = rootObject.Asteroids = rootObject.Asteroids || {};
  
  var Ship = Asteroids.Ship = function() {
    Asteroids.MovingObject.call(this, arguments);
    // this.radius = Ship.RADIUS;
		this.image = new Image();
		this.image.src = 'https://s3-us-west-1.amazonaws.com/krazysquirrelz/squirrel.png';
    this.vel = [0, 0];
		this.lives = 3;
  };
  
  Ship.inherits(Asteroids.MovingObject);
  
  // Ship.COLOR = "red";
  // Ship.RADIUS = "10";
  
  Ship.prototype.relocate = function () {
    this.pos = Asteroids.Game.randomPos();
    this.vel = [0, 0];
  };
  
  Ship.prototype.power = function(impulse) {
		original_vel0 = this.vel[0];
		if (this.vel[0] < 0 && impulse[0] < 0 || this.vel[0] > 0 && impulse[0] > 0) {
			this.vel[0] += impulse[0];
		} else {
			this.vel[0] = impulse[0];
		}
		if (this.vel[1] < 0 && impulse[1] < 0 || this.vel[1] > 0 && impulse[1] > 0) {
			this.vel[1] += impulse[1];
		} else {
			this.vel[1] = impulse[1];
		}
  };

})(this); 
  
  
  