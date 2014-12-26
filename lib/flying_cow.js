(function (rootObject){
  var SquirrelHero = rootObject.SquirrelHero = rootObject.SquirrelHero || {};
  
  var FlyingCow = SquirrelHero.FlyingCow = function () {
    SquirrelHero.MovingObject.call(this, arguments);
		this.radius = 38.5;
		this.vel = [-(Math.random() * 3 + 1), 0]
		this.image = new Image();
		this.image.src = 'https://s3-us-west-1.amazonaws.com/krazysquirrelz/cow_balloon.png';
		// this.armor = this.radius;
		// var velArr = [-2, -1, 1, 2];
// 		for (var i = 0; i < 2; i++) {
// 			var randPos = Math.floor(Math.random() * velArr.length);
// 			this.vel[i] = Number(velArr.slice(randPos, randPos + 1));
// 		}
  };
  
  FlyingCow.inherits(SquirrelHero.MovingObject);
  
})(this);