(function(rootObject) {
  var Asteroids = rootObject.Asteroids = rootObject.Asteroids || {};
  
 
  
  var Game = Asteroids.Game = function () {
    this.asteroids = [];
		this.bullets = [];
    this.addAsteroids();
    this.ship = new Asteroids.Ship({pos: Game.randomPos()});
		this.gameOver = false;
		this.score = 0;
  };
  
  Game.DIM_X = rootObject.innerWidth;
  Game.DIM_Y = rootObject.innerHeight;
  Game.NUM_ASTEROIDS = 10;
  
  Game.prototype.allObjects = function() {
    var objArray = this.asteroids.slice(0);
    objArray.push(this.ship);
		objArray = objArray.concat(this.bullets);
    return objArray;
  };

  
  Game.prototype.addAsteroids = function () {
    for (var i = 0; i < Game.NUM_ASTEROIDS; i++) {
      this.asteroids.push(new Asteroids.Asteroid({pos: Game.randomPos()}));
    }
  };
	
	
  Game.prototype.addBullet = function (shipVel, shipPos) {
		shipPos[0] += shipVel[0] * 12;
		shipPos[1] += shipVel[1] * 12;
		shipVel[0] *= 5;
		shipVel[1] *= 5;
    this.bullets.push(new Asteroids.Bullet({vel: shipVel, pos: shipPos}));
  };

  
  Game.prototype.draw = function(ctx) {
    ctx.clearRect(0, 0, Game.DIM_X, Game.DIM_Y);
		// var img = new Image();
	// 	img.src = 'stars.jpg';
	// 	img.onload = function () {
	// 	  ctx.drawImage(img, 10, 10);
	// 	};
		// 	  ctx.fillStyle = "white";
		// ctx.beginPath();
		// ctx.moveTo(15, 15);
		// ctx.lineTo(15 + 100, 15);
		// 	  ctx.lineTo(15 + 100, 15 + 50);
		// 	  ctx.lineTo(15, 15 + 50);
		// // ctx.closePath();
		// ctx.fill();
		//
		// ctx.fillText("Score", 20, 30);
		
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
    that.allObjects().forEach((function(movObj) {
      that.allObjects().forEach(function(otherMovObj) {
        if (movObj !== otherMovObj) {
          if(movObj.isCollidedWith(otherMovObj)) {
            if (otherMovObj instanceof(Asteroids.Ship)) {
							if (!(movObj instanceof(Asteroids.Bullet))) {
								that.loseLife(otherMovObj);
								if(otherMovObj.lives <= 0) {
									return;
								}
							}
            } else if (movObj instanceof(Asteroids.Ship)) {
							if (!(otherMovObj instanceof(Asteroids.Bullet))) {
								that.loseLife(movObj);
								if(movObj.lives <= 0) {
									return;
								}
							}
						} else if (movObj instanceof Asteroids.Bullet && otherMovObj instanceof Asteroids.Bullet) {
						  //do nothing
						} else if (otherMovObj instanceof Asteroids.Bullet) {
							if (movObj.armor > 1) {
							  movObj.armor--;
							} else {
							  that.remove(movObj);
								that.remove(otherMovObj);
								that.score += movObj.radius;
							}
						}
          }
        }
      });
    }).bind(that));
  };
	
	// Game.prototype.noMoreLives = function() {
	// 	this.gameOver = true;
	// 	if (!confirm("Game Over! Would you like to play again?")) {
	// 		var canvas = document.getElementById("game-canvas");
	// 		canvas.height = window.innerHeight;
	// 		canvas.width = window.innerWidth;
	// 		var ctx = canvas.getContext("2d");
	// 		var g = new Asteroids.Game();
	// 		var gView = new Asteroids.GameView(g, ctx);
	// 		gView.start();
	// 	}
	// };
	
	Game.prototype.loseLife = function(movObj) {
		if (movObj.lives > 0) {
			movObj.lives--;
			alert("Lost a life");
		  movObj.relocate();
	  } else {
		  this.gameOver = true;
		}
	};
  
  Game.prototype.remove = function(movingObject) {
		if (movingObject instanceof Asteroids.Asteroid) {
      var ind = this.asteroids.indexOf(movingObject);
      this.asteroids.splice(ind, 1);
	  } else {
      var ind = this.bullets.indexOf(movingObject);
      this.bullets.splice(ind, 1);
		}
  };
  
  Game.prototype.step = function(intervalInd) {
		if(!this.gameOver) {
	    this.moveObjects();
	    this.checkCollisions();
	  } else {
		  clearInterval(intervalInd);
			debugger
			$("#game-over-modal").modal("toggle");
		  $(".game-over-blurb").typed({
        strings: ["Squirrel Hero, you couldn't save the cows from the mad scientist... <br><br> Dr. Zonko: Mua-ha-HA-HA, the cows are under my control now! My mad cow army grows every day. Squirrel Hero, you can't stop me from taking over the world, he-he-HE! Come my cow minions... <br><br> Hope is not yet lost! Play again to save the world."],
        typeSpeed: 0
		  });
		}
  };
  
  Game.randomPos = function () {
    var x = Math.floor(Game.DIM_X * Math.random());
    var y = Math.floor(Game.DIM_Y * Math.random());
    return [x, y];
  };
  
})(this);