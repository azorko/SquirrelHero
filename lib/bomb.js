(function (rootObject){
  var SquirrelHero = rootObject.SquirrelHero = rootObject.SquirrelHero || {};
  
  var Bomb = SquirrelHero.Bomb = function () {
    SquirrelHero.MovingObject.call(this, arguments);
		this.radius = 79;
    this.vel = [-(Math.random() * 3 + 1), 0]
		this.image = new Image();
		this.image.src = 'https://s3-us-west-1.amazonaws.com/krazysquirrelz/bomb-edit.png';
  };
  
  Bomb.inherits(SquirrelHero.MovingObject);
  
})(this);