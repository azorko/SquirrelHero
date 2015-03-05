(function (rootObject){
  var SquirrelHero = rootObject.SquirrelHero = rootObject.SquirrelHero || {};
  
  var Cow = SquirrelHero.Cow = function () {
    SquirrelHero.MovingObject.call(this, arguments);
		this.width = 100;
		this.height = 100;
		this.radius = this.getRadius();
    this.vel = [0, 0.5];
		this.fallSoFar = 0;
		this.image = new Image();
		this.image.src = 'https://s3-us-west-1.amazonaws.com/krazysquirrelz/cow.png';
  };
  
  Cow.inherits(SquirrelHero.MovingObject);
  
})(this);