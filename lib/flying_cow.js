(function (rootObject){
  var SquirrelHero = rootObject.SquirrelHero = rootObject.SquirrelHero || {};
  
  var FlyingCow = SquirrelHero.FlyingCow = function () {
    SquirrelHero.MovingObject.call(this, arguments);
		this.radius = 38.5;
		this.vel = [-(Math.random() * 3 + 1), 0]
		this.image = new Image();
		this.armor = Math.floor(Math.random() * 3) + 1;
		if (this.armor === 1) {
			this.image.src = 'https://s3-us-west-1.amazonaws.com/krazysquirrelz/cow_balloon.png';
		} else if (this.armor === 2) {
			this.image.src = 'https://s3-us-west-1.amazonaws.com/krazysquirrelz/cow-balloon-red.png';
		} else if (this.armor === 3) {
			this.image.src = 'https://s3-us-west-1.amazonaws.com/krazysquirrelz/cow-balloon-green.png';
		}
		// var velArr = [-2, -1, 1, 2];
// 		for (var i = 0; i < 2; i++) {
// 			var randPos = Math.floor(Math.random() * velArr.length);
// 			this.vel[i] = Number(velArr.slice(randPos, randPos + 1));
// 		}
  };
  
  FlyingCow.inherits(SquirrelHero.MovingObject);
  
})(this);