(function (rootObject){
  var Asteroids = rootObject.Asteroids = rootObject.Asteroids || {};
  
  var Cow = Asteroids.Cow = function () {
    Asteroids.MovingObject.call(this, arguments);
		this.radius = 38.5;
    this.vel = [0, 0.5];
		this.fall_so_far = 0;
		this.image = new Image();
		this.image.src = 'https://s3-us-west-1.amazonaws.com/krazysquirrelz/cow.png';
		// this.fall_dist = 
		// this.armor = this.radius;
		// var velArr = [-2, -1, 1, 2];
// 		for (var i = 0; i < 2; i++) {
// 			var randPos = Math.floor(Math.random() * velArr.length);
// 			this.vel[i] = Number(velArr.slice(randPos, randPos + 1));
// 		}
  };
  
  Cow.inherits(Asteroids.MovingObject);
  
})(this);