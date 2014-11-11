(function(rootObject) {
  var Asteroids = rootObject.Asteroids = rootObject.Asteroids || {};
  
 
  
  var Game = Asteroids.Game = function () {
    this.asteroids = [];
    this.addAsteroids();
    this.ship = new Asteroids.Ship({pos: Game.randomPos()});
  };
  
  Game.DIM_X = rootObject.innerWidth;
  Game.DIM_Y = rootObject.innerHeight;
  Game.NUM_ASTEROIDS = 4;
  
  Game.prototype.allObjects = function() {
    var objArray = this.asteroids.slice(0);
    objArray.push(this.ship);
    return objArray;
  };

  
  Game.prototype.addAsteroids = function () {
    for (var i = 0; i < Game.NUM_ASTEROIDS; i++) {
      this.asteroids.push(new Asteroids.Asteroid({pos: Game.randomPos()}));
    }
  };
  

  
  Game.prototype.draw = function(ctx) {
    ctx.clearRect(0, 0, Game.DIM_X, Game.DIM_Y);
    var movObjs = this.allObjects();
    for (var i = 0; i < movObjs.length; i++) {
      movObjs[i].draw(ctx);
    }
  };
  
  Game.prototype.moveObjects = function() {
    var movObjs = this.allObjects();
    this.allObjects().forEach(function(movObj) {
      movObj.move();
    });
  };
  
  Game.prototype.checkCollisions = function() {
    var that = this;
    this.allObjects().forEach((function(movObj) {
      that.allObjects().forEach(function(otherMovObj) {
        if (movObj !== otherMovObj) {
          if(movObj.isCollidedWith(otherMovObj)) {
            console.log("collision");
            if (otherMovObj instanceof(Asteroids.Ship) ) {
              console.log("Ship collision");
              otherMovObj.relocate();
            }
          }
        }
      });
    }).bind(that));
  };
  
  Game.prototype.remove = function(movingObject) {
    var ind = this.asteroids.indexOf(movingObject);
    this.asteroids.splice(ind, 1);
  };
  
  Game.prototype.step = function() {
    this.moveObjects();
    // this.checkCollisions();
  };
  
  Game.randomPos = function () {
    var x = Math.floor(Game.DIM_X * Math.random());
    var y = Math.floor(Game.DIM_Y * Math.random());
    return [x, y];
  };
  
})(this);