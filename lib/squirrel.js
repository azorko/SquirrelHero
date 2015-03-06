(function (rootObject) {
  var SquirrelHero = rootObject.SquirrelHero = rootObject.SquirrelHero || {};
  
  var Squirrel = SquirrelHero.Squirrel = function() {
		this.width = 77;
		this.height = 54;
    SquirrelHero.MovingObject.call(this, arguments);
    this.vel = [0, 0];
		this.lives = 3;
		this.acorns = 15;
		this.image = new Image();
		this.image.src = 'https://s3-us-west-1.amazonaws.com/krazysquirrelz/squirrel.png';
  };
  
  Squirrel.inherits(SquirrelHero.MovingObject);
  
  Squirrel.prototype.power = function(impulse) {
		this.vel[0] = impulse[0];
		this.vel[1] = impulse[1];
  };

})(this); 
  
  
  