(function (rootObject) {
  var SquirrelHero = rootObject.SquirrelHero = rootObject.SquirrelHero || {};
  
  var Ship = SquirrelHero.Ship = function() {
    SquirrelHero.MovingObject.call(this, arguments);
		this.image = new Image();
		this.image.src = 'https://s3-us-west-1.amazonaws.com/krazysquirrelz/squirrel.png';
    this.vel = [0, 0];
		this.lives = 3;
  };
  
  Ship.inherits(SquirrelHero.MovingObject);
  
  // Ship.prototype.relocate = function () {
  //   this.pos = SquirrelHero.Game.startPos();
  //   this.vel = [0, 0];
  // };
  
  Ship.prototype.power = function(impulse) {
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
  
  
  