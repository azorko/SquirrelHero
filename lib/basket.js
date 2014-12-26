(function (rootObject){
  var SquirrelHero = rootObject.SquirrelHero = rootObject.SquirrelHero || {};
  
  var Basket = SquirrelHero.Basket = function () {
    SquirrelHero.MovingObject.call(this, arguments);
		this.radius = 90;
    this.vel = [-(Math.random() * 3 + 1), 0]
		this.image = new Image();
		this.image.src = 'https://s3-us-west-1.amazonaws.com/krazysquirrelz/basket-acorns.png';
  };
  
  Basket.inherits(SquirrelHero.MovingObject);
  
})(this);