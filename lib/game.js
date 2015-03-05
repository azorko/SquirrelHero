(function(rootObject) {
  var SquirrelHero = rootObject.SquirrelHero = rootObject.SquirrelHero || {};
  
  var Game = SquirrelHero.Game = function (ctx) {
		this.squirrel = new SquirrelHero.Squirrel({pos: [300, 300] });
		
		var forestMp3 = "https://s3-us-west-1.amazonaws.com/krazysquirrelz/forest-music.mp3";
		this.forestSound = new Audio(forestMp3);
		
		this.init();
		this.ctx = ctx;
		this.level = 1;
		this.score = 0;
		
		var popMp3 = "https://s3-us-west-1.amazonaws.com/krazysquirrelz/pop.mp3";
		this.popSounds = [ new Audio(popMp3), new Audio(popMp3), new Audio(popMp3), new Audio(popMp3) ];
		this.popInd = 0;
		
		var bounceMp3 = "https://s3-us-west-1.amazonaws.com/krazysquirrelz/bounce.mp3";
		this.bounceSounds = [ new Audio(bounceMp3), new Audio(bounceMp3), new Audio(bounceMp3), new Audio(bounceMp3) ];
		this.bounceInd = 0;
		
		var bombMp3 = "https://s3-us-west-1.amazonaws.com/krazysquirrelz/bomb.mp3";
		this.bombSounds = [ new Audio(bombMp3), new Audio(bombMp3), new Audio(bombMp3), new Audio(bombMp3) ];
		this.bombInd = 0;
		
		var mooMp3 = "https://s3-us-west-1.amazonaws.com/krazysquirrelz/moo.mp3";
		this.mooSounds = [ new Audio(mooMp3), new Audio(mooMp3), new Audio(mooMp3), new Audio(mooMp3) ];
		this.mooInd = 0;
		
		var laughMp3 = "https://s3-us-west-1.amazonaws.com/krazysquirrelz/evil-laugh.mp3";
		this.laughSounds = [ new Audio(laughMp3), new Audio(laughMp3), new Audio(laughMp3), new Audio(laughMp3) ];
		this.laughInd = 0;
		
		var trumpetMp3 = "https://s3-us-west-1.amazonaws.com/krazysquirrelz/trumpet.mp3";
		this.trumpetSounds = [ new Audio(trumpetMp3), new Audio(trumpetMp3), new Audio(trumpetMp3), new Audio(trumpetMp3) ];
		this.trumpetInd = 0;
		
		$('.restart-button').on('click', this.resetGame.bind(this));
  };
	
  Game.DIM_X = rootObject.innerWidth;
  Game.DIM_Y = rootObject.innerHeight;
	
	Game.prototype.init = function () {
    this.flyingCows = [];
		this.acorns = [];
		this.cows = [];
		this.bombs = [];
		this.baskets = [];
		
		var colCount = 0;
		var that = this;
		itemsPerCol = Math.floor(Game.DIM_Y / 180);
		this.bombCount = 3;
		this.basketCount = 0;
		this.flyingCowCount = itemsPerCol * 3 + (3 - this.squirrel.lives) - this.bombCount - 1; //1 for acorn basket count
		this.basketCol =  Math.floor(Math.random() * 3);
	
		this.addFlyingObjects(itemsPerCol, colCount);
		colCount++;
	    var intervalInd = rootObject.setInterval( function () {
			if (colCount === 2) { clearInterval(intervalInd); }
			that.addFlyingObjects(itemsPerCol, colCount);
			colCount++;
		}, 8000 )
		
		this.squirrel.pos = [300, 300];
		this.squirrel.vel = [0, 0];
		this.gameOver = false;
		this.forestSound.play();
	};
  
  Game.prototype.allObjects = function() {
    var objArray = this.flyingCows.slice(0);
    objArray.push(this.squirrel);
		objArray = objArray.concat(this.bombs);
		objArray = objArray.concat(this.baskets);
		objArray = objArray.concat(this.acorns);
		objArray = objArray.concat(this.cows);
    return objArray;
  };

  Game.prototype.addFlyingObjects = function (itemsPerCol, colCount) {
		var numBombs = 0;
		var basketRow, bombRow;
		bombRow = Math.floor(Math.random() * itemsPerCol);
		if (this.basketCol === colCount) {
			basketRow = Math.floor(Math.random() * itemsPerCol);
			while (basketRow === bombRow) {
				bombRow = Math.floor(Math.random() * itemsPerCol);
			}
		}
		
    for (var i = 0; i < itemsPerCol; i++) {
	    var x = Game.DIM_X - 102;
	    var y = 180 * i;
			
			if (basketRow === i) {
				this.baskets.push(new SquirrelHero.Basket({pos: [x, y]}));
			} else if (bombRow === i) {
				this.bombs.push(new SquirrelHero.Bomb({pos: [x, y]}));
			} else {
        this.flyingCows.push(new SquirrelHero.FlyingCow({pos: [x, y]}));
		  }
    }
  };
	
  Game.prototype.addAcorn = function (squirrelVel, squirrelPos) {
		this.squirrel.acorns--;
		squirrelPos[0] += squirrelVel[0] + 78;
		squirrelPos[1] += squirrelVel[1] + 54;
    this.acorns.push(new SquirrelHero.Acorn({vel: [8, 0], pos: squirrelPos}));
  };
	
	Game.prototype.addCow = function (pos) {
		var fall = 0;
		if ( pos[1] < (Game.DIM_Y / 2)) { fall = Game.DIM_Y / 4; }
    this.cows.push(new SquirrelHero.Cow({pos: [pos[0], pos[1] + 83], fall: fall }));
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
			if (movObj instanceof SquirrelHero.FlyingCow && movObj.pos[0] < 0) {
				that.loseLife("cow");
	      that.laughInd = that.playSound(that.laughSounds, that.laughInd);
				that.remove(movObj);
			} else if (movObj instanceof SquirrelHero.Cow && movObj.vel[1] !== 0) {
				movObj.fallSoFar += 0.5;
				if (movObj.fall < movObj.fallSoFar) {
					that.mooInd = that.playSound(that.mooSounds, that.mooInd);
					movObj.vel = [0, 0];
				}
			}
			
      movObj.move();
    });
  };
  
  Game.prototype.checkCollisions = function() {
    var that = this, i, j, numObjs, movObj, otherMovObj;
		allObjs = that.allObjects(); //array
    numObjs = allObjs.length;
		for (i = 0; i < numObjs - 1; i++) {
			movObj = allObjs[i];
			for (j = i + 1; j < numObjs; j++) {
				otherMovObj = allObjs[j];
        if(movObj.isCollidedWith(otherMovObj)) {
					if (movObj instanceof SquirrelHero.Squirrel && otherMovObj instanceof SquirrelHero.Basket) {
					  that.squirrel.acorns += 15;
						that.remove(otherMovObj);
						that.trumpetInd = that.playSound(that.trumpetSounds, that.trumpetInd);
					} else if (movObj instanceof SquirrelHero.Squirrel && otherMovObj instanceof SquirrelHero.Bomb) {
						that.loseLife("bomb");
						that.squirrel.pos = [300, 300];
						that.squirrel.vel = [0, 0];
						that.remove(otherMovObj);
						that.flyingCowCount++;
						that.bombInd = that.playSound(that.bombSounds, that.bombInd);
					} else if (otherMovObj instanceof SquirrelHero.Acorn && movObj instanceof SquirrelHero.FlyingCow) {
						if (movObj.armor > 1) {
						  movObj.armor--;
							that.remove(otherMovObj);
							that.bounceInd = that.playSound(that.bounceSounds, that.bounceInd);
						} else {
							that.popInd = that.playSound(that.popSounds, that.popInd);
							that.flyingCowCount--;
						  that.addCow(movObj.pos);
						  that.remove(movObj);
							that.remove(otherMovObj);
							that.score += 50;
						}
					}
        }
			}
		}
	};
	
	Game.prototype.loseLife = function(flag) {
		if (this.squirrel.lives > 0) {
			this.squirrel.lives--;
			if (flag === "bomb") {
				$(".status-alert").html("Lost a Life");
			} else {
				$(".status-alert").html("Zonko Captured a Cow!");
			}
			$(".status-alert").removeClass("hidden");
			$(".status-alert").addClass("visible");
			window.setTimeout(function () {
				$(".status-alert").removeClass("visible");
				$(".status-alert").addClass("hidden");
			}, 3000);
	  } else {
		  this.gameOver = true;
		}
	};
	
	Game.prototype.playSound = function(soundArr, soundInd) {
		soundArr[soundInd].play();
		if (soundInd === 3) {
			soundInd = 0;
		} else {
			soundInd++;
		}
		return soundInd;
	};
  
  Game.prototype.remove = function(movingObject) {
		if (movingObject instanceof SquirrelHero.FlyingCow) {
      var ind = this.flyingCows.indexOf(movingObject);
      this.flyingCows.splice(ind, 1);
	  } else if (movingObject instanceof SquirrelHero.Acorn) {
      var ind = this.acorns.indexOf(movingObject);
      this.acorns.splice(ind, 1);
		} else if (movingObject instanceof SquirrelHero.Bomb) {
      var ind = this.bombs.indexOf(movingObject);
      this.bombs.splice(ind, 1);
		} else if (movingObject instanceof SquirrelHero.Basket) {
      var ind = this.baskets.indexOf(movingObject);
      this.baskets.splice(ind, 1);
		}
  };
	
	Game.prototype.resetGame = function(event) {
		var flyingCowAmt = 3 - this.squirrel.lives;	
		event.preventDefault();
		if (this.flyingCowCount !== flyingCowAmt) {
			this.level = 1;
			this.score = 0;
			this.squirrel.lives = 3;
			this.squirrel.acorns = 15;
		  $("#game-over-modal").modal("hide");
		} else {
			$("#game-won-modal").modal("hide");
		}
		this.forestSound.pause();
	  this.init();
		var that = this;
    var intervalIndRestart = rootObject.setInterval(function() {
      that.step(intervalIndRestart);
      that.draw(that.ctx);
			that.gameStats();
    }, 20);
	};
  
  Game.prototype.step = function(intervalInd) {
		var flyingCowAmt = 3 - this.squirrel.lives; //winning asteroid amount, accounts for flyingCows that passed the left screen border
		
		if(this.flyingCowCount === flyingCowAmt) {
			this.level++;
		  this.gameOver = true;	
		}
		
		if(!this.gameOver) {
	    this.moveObjects();
	    this.checkCollisions();
	  } else {
		  clearInterval(intervalInd);
			
			if (this.flyingCowCount !== flyingCowAmt) {
				$("#game-over-modal").modal("show");
			} else {
				$("#game-won-modal").modal("show");
			}
		}
  };
	
	Game.prototype.gameStats = function() {
	  var $stats = $(".game-stats").empty();
		var text = "Level: "+this.level+"<br> Score: "+this.score+"<br>Acorns: "+this.squirrel.acorns+"<br>Lives: "+this.squirrel.lives;
		$stats.append(text);
	};
  
})(this);