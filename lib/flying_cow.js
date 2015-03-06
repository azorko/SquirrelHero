(function (rootObject){
  var SquirrelHero = rootObject.SquirrelHero = rootObject.SquirrelHero || {};
  
  var FlyingCow = SquirrelHero.FlyingCow = function () {
		this.width = 127;
		this.height = 77;
    SquirrelHero.MovingObject.call(this, arguments);
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
  };
  
  FlyingCow.inherits(SquirrelHero.MovingObject);
  
})(this);