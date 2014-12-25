(function(rootObject) {
  var Asteroids = rootObject.Asteroids = rootObject.Asteroids || {};
  
  var Game = Asteroids.Game = function (ctx) {
    this.init();
		this.ctx = ctx;
		this.level = 1;
		$('.restart-button').on('click', this.resetGame.bind(this));
  };
	
	Game.prototype.init = function () {
    this.asteroids = [];
		this.bullets = [];
		this.cows = [];
		
		var asteroid_col_count = 0;
		var that = this;
		cows_per_col = Math.floor(Game.DIM_Y / 180);
		this.asteroidCount = cows_per_col * 3;
		that.addAsteroids(cows_per_col);
    var intervalInd = rootObject.setInterval( function () {
			if (asteroid_col_count === 1) { clearInterval(intervalInd); }
			that.addAsteroids(cows_per_col);
			asteroid_col_count += 1;
		}, 8000 )
		
    this.ship = new Asteroids.Ship({pos: [300, 300] });
		this.gameOver = false;
		this.score = 0;
		
		var forest_mp3 = "https://s3-us-west-1.amazonaws.com/krazysquirrelz/forest-music.mp3";
		this.forest_sound = new Audio(forest_mp3);
		this.forest_sound.volume = 1.0;
		this.forest_sound.play();

		var pop_mp3 = "https://s3-us-west-1.amazonaws.com/krazysquirrelz/pop.mp3";
		this.pop_sounds = [ new Audio(pop_mp3), new Audio(pop_mp3), new Audio(pop_mp3), new Audio(pop_mp3) ];
		this.pop_ind = 0;
		// this.pop_sound.volume = 1.0;
		
		var moo_mp3 = "https://s3-us-west-1.amazonaws.com/krazysquirrelz/moo.mp3";
		this.moo_sounds = [ new Audio(moo_mp3), new Audio(moo_mp3), new Audio(moo_mp3), new Audio(moo_mp3) ];
		this.moo_ind = 0;
		// this.moo_sound.volume = 1.0;
		
		var laugh_mp3 = "https://s3-us-west-1.amazonaws.com/krazysquirrelz/evil-laugh.mp3";
		this.laugh_sounds = [ new Audio(laugh_mp3), new Audio(laugh_mp3), new Audio(laugh_mp3), new Audio(laugh_mp3) ];
		this.laugh_ind = 0;
		// this.laugh_sound.volume = 1.0;
	};
  
  Game.DIM_X = rootObject.innerWidth;
  Game.DIM_Y = rootObject.innerHeight;
  
  Game.prototype.allObjects = function() {
    var objArray = this.asteroids.slice(0);
    objArray.push(this.ship);
		objArray = objArray.concat(this.bullets);
		objArray = objArray.concat(this.cows);
    return objArray;
  };

  Game.prototype.addAsteroids = function (cows_per_col) {
    for (var i = 0; i < cows_per_col; i++) {
	    var x = Game.DIM_X - 102;
	    var y = 180 * i;
			if (this.replay_count >= 2) { debugger; }
      this.asteroids.push(new Asteroids.Asteroid({pos: [x, y]}));
    }
  };
	
  Game.prototype.addBullet = function (shipVel, shipPos) {
		shipPos[0] += shipVel[0] + 78;
		shipPos[1] += shipVel[1] + 54;
		shipVel[0] = Math.abs(shipVel[0] + shipVel[1]) * 5;
		shipVel[1] = 0;
    this.bullets.push(new Asteroids.Bullet({vel: shipVel, pos: shipPos}));
  };
	
	Game.prototype.addCow = function (pos) {
		var fall = 0;
		if (pos[1] === 0) {
			fall = 450;
		} else if (pos[1] === 180) {
			fall = 350;
		}
    this.cows.push(new Asteroids.Cow({pos: [pos[0], pos[1] + 83], fall: fall }));
  };

  Game.prototype.draw = function(ctx) {
    ctx.clearRect(0, 0, Game.DIM_X, Game.DIM_Y);
		
    var movObjs = this.allObjects();
    for (var i = 0; i < movObjs.length; i++) {
      movObjs[i].draw(ctx);
    }
  };
  
  Game.prototype.moveObjects = function() {
		var that = this;
    this.allObjects().forEach(function(movObj) {
			if (movObj instanceof Asteroids.Asteroid && movObj.pos[0] < 0) {
				that.loseLife(movObj);
				// that.laugh_sound.pause();
				that.laugh_sounds[that.laugh_ind].play();
				that.laugh_ind++;
				that.remove(movObj);
			} else if (movObj instanceof Asteroids.Cow && movObj.vel[1] !== 0) {
				movObj.fall_so_far += 0.5;
				if (movObj.fall < movObj.fall_so_far) {
					that.moo_sounds[that.moo_ind].play();
					that.moo_ind++;
					movObj.vel = [0, 0];
				}
			}
			
      movObj.move();
    });
  };
  
  Game.prototype.checkCollisions = function() {
    var that = this;
    that.allObjects().forEach((function(movObj) {
      that.allObjects().forEach(function(otherMovObj) {
        if (movObj !== otherMovObj) {
          if(movObj.isCollidedWith(otherMovObj)) {
						//             if (otherMovObj instanceof(Asteroids.Ship)) {
						// 	if (!(movObj instanceof(Asteroids.Bullet))) {
						// 		that.loseLife(otherMovObj);
						// 		if(otherMovObj.lives <= 0) {
						// 			return;
						// 		}
						// 	}
						//             } else if (movObj instanceof(Asteroids.Ship)) {
						// 	if (!(otherMovObj instanceof(Asteroids.Bullet))) {
						// 		that.loseLife(movObj);
						// 		if(movObj.lives <= 0) {
						// 			return;
						// 		}
						// 	}
						// } else if (movObj instanceof Asteroids.Bullet && otherMovObj instanceof Asteroids.Bullet) {
						//   //do nothing
						// } else
						if (otherMovObj instanceof Asteroids.Bullet && movObj instanceof Asteroids.Asteroid) {
							// if (movObj.armor > 1) {
						// 	  movObj.armor--;
						// 	} else {
						  rootObject.setTimeout( function () {
								// that.pop_sound.pause();
								
								that.pop_sounds[that.pop_ind].play();
								that.pop_ind++;
							}, 0 );
							that.asteroidCount--;
						  that.addCow(movObj.pos);
						  that.remove(movObj);
							that.remove(otherMovObj);
							that.score += 50;
							// }
						}
          }
        }
      });
    }).bind(that));
  };
	
	Game.prototype.loseLife = function() {
		if (this.ship.lives > 0) {
			this.ship.lives--;
			$(".status-alert").removeClass("hidden");
			$(".status-alert").addClass("visible");
			window.setTimeout(function () {
				$(".status-alert").removeClass("visible");
				$(".status-alert").addClass("hidden");
			}, 3000);
		  // movObj.relocate();
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
	
	Game.prototype.resetGame = function(event) {
		debugger
		var asteroid_amt = 3 - this.ship.lives;	
		debugger
		event.preventDefault();
		if (this.asteroidCount !== asteroid_amt) {
		  $("#game-over-modal").modal("hide");
		} else {
			$("#game-won-modal").modal("hide");
		}
		if (this.replay_count >= 2) { debugger; }
		this.forest_sound.pause();
	  this.init();
		var that = this;
    var intervalIndRestart = rootObject.setInterval(function() {
			that.replay_count++;
      that.step(intervalIndRestart);
      that.draw(that.ctx);
			that.gameStats();
    }, 20);
	};
  
  Game.prototype.step = function(intervalInd) {
		var asteroid_amt = 3 - this.ship.lives; //winning asteroid amount, accounts for asteroids that passed the left screen border
		if(this.asteroidCount === asteroid_amt) {
			this.level++;
		  this.gameOver = true;	
		}
		
		if(!this.gameOver) {
	    this.moveObjects();
	    this.checkCollisions();
	  } else {
		  clearInterval(intervalInd);
			
			if (this.asteroidCount !== asteroid_amt) {
				$("#game-over-modal").modal("show");
			} else {
				$("#game-won-modal").modal("show");
			}
		
			// var that = this;
			
			// $('.restart-button').on('click', function (event) {
// 				debugger
// 				event.preventDefault();
// 				if (this.asteroidCount !== asteroid_amt) {
// 				  $("#game-over-modal").modal("toggle");
// 				} else {
// 					$("#game-won-modal").modal("toggle");
// 				}
// 				if (this.replay_count >= 2) { debugger; }
// 				this.forest_sound.pause();
// 			  that.init();
// 		    var intervalIndRestart = rootObject.setInterval(function() {
// 					that.replay_count++;
// 		      that.step(intervalIndRestart);
// 		      that.draw(that.ctx);
// 					that.gameStats();
// 		    }, 20);
			// });
		}
  };
  
  Game.randomPos = function () {
		
    var x = Math.floor(Game.DIM_X - 102);
    var y = Math.floor((Game.DIM_Y - 178) * Math.random());
    return [x, y];	
  };
	
	Game.prototype.gameStats = function() {
	  var $stats = $(".game-stats").empty();
		$stats.append("Level: " + this.level);
		$stats.append($("<br>"));
		$stats.append("Score: " + this.score);
		$stats.append($("<br>"));
		$stats.append("Cows: " + this.ship.lives);
	};
  
})(this);