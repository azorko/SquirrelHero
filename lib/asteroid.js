(function (rootObject){
  var Asteroids = rootObject.Asteroids = rootObject.Asteroids || {};
  
  var Asteroid = Asteroids.Asteroid = function () {
    Asteroids.MovingObject.call(this, arguments);
		var radiusSizes = [20, 30, 40, 50];
    this.radius = radiusSizes[Math.floor(Math.random() * 4)];
    // this.color = Asteroid.COLOR;
    this.vel = [];
		this.image = new Image();
		this.image.src = 'https://s3-us-west-1.amazonaws.com/krazysquirrelz/cow_balloon.gif';
		this.armor = this.radius;
		var velArr = [-2, -1, 1, 2];
		for (var i = 0; i < 2; i++) {
			var randPos = Math.floor(Math.random() * velArr.length);
			this.vel[i] = Number(velArr.slice(randPos, randPos + 1));
		}
  };
  
  Asteroid.inherits(Asteroids.MovingObject);
  
  Asteroid.COLOR = "#cccccc";
  
})(this);