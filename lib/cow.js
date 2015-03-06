(function (rootObject){
  var SquirrelHero = rootObject.SquirrelHero = rootObject.SquirrelHero || {};
  
  var Cow = SquirrelHero.Cow = function () {
		this.width = 100;
		this.height = 100;
    SquirrelHero.MovingObject.call(this, arguments);
    this.vel = [0, 0.5];
		this.fallSoFar = 0;
		this.image = new Image();
		this.image.src = 'https://s3-us-west-1.amazonaws.com/krazysquirrelz/cow.png';
  };
  
  Cow.inherits(SquirrelHero.MovingObject);
  
})(this);