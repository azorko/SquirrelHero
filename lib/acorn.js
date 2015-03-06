(function (rootObject){
  var SquirrelHero = rootObject.SquirrelHero = rootObject.SquirrelHero || {};
  
  var Acorn = SquirrelHero.Acorn = function () { //will take in vel
		this.width = 30;
		this.height = 20;
    SquirrelHero.MovingObject.call(this, arguments);
		this.image = new Image();
		this.image.src = 'https://s3-us-west-1.amazonaws.com/krazysquirrelz/acorn.png';
  };
  
  Acorn.inherits(SquirrelHero.MovingObject);
  
})(this);