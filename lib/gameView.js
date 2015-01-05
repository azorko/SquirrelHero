(function(rootObject) {
  var SquirrelHero = rootObject.SquirrelHero = rootObject.SquirrelHero || {};
  
  var GameView = SquirrelHero.GameView = function(game, ctx, el) {
    this.game = game;
    this.ctx = ctx;
		this.$el = el;
		this.keyStates = { 38: false, 40: false, 39: false, 37: false };
  };
  
  GameView.prototype.start = function() {
    var that = this;
		$("body").on("keydown", that.keyHandler.bind(that));
		$("body").on("keyup", that.stopSquirrel.bind(that));
		
		$("#game-start-modal").modal("toggle");
		
		$('#start-button').on('click', function (event) {
			event.preventDefault();
			$("#game-start-modal").modal("toggle");
			$(".game-stats").removeClass("hidden");
			rootObject.setTimeout(function () {
				$(".instructions").html("<img src='https://s3-us-west-1.amazonaws.com/krazysquirrelz/move-shoot.png'></img>");
			}, 0);
			rootObject.setTimeout(function () {
				$(".instructions").empty();
				$(".instructions").html("<img src='https://s3-us-west-1.amazonaws.com/krazysquirrelz/bombs-baskets.png'></img>");
			}, 3000);
			rootObject.setTimeout(function () {
				$(".instructions").empty();
			}, 6000);
	    var intervalInd = rootObject.setInterval(function() {
	      that.game.step(intervalInd);
	      that.game.draw(that.ctx);
				that.game.gameStats();
	    }, 20);
		});
  };
	
	GameView.prototype.keyHandler = function (event) {
		var game = this.game;
		if (event.keyCode === 38) {//up
			this.changeKeyStates(38);
		  game.squirrel.power([0, -4]);
		} else if (event.keyCode === 39) {//right
			this.changeKeyStates(39);
			game.squirrel.power([4, 0]);
		} else if (event.keyCode === 40) {//down
			this.changeKeyStates(40);
			game.squirrel.power([0, 4]);
		} else if (event.keyCode === 37) {//left
			this.changeKeyStates(37);
			game.squirrel.power([-4, 0]);
		} else if (event.keyCode === 32) {//space
			if (game.squirrel.acorns > 0) {
        game.addAcorn(game.squirrel.vel.slice(0), game.squirrel.pos.slice(0));
		  }
		}
		 
	}
	
	GameView.prototype.changeKeyStates = function (dir) {
		var that = this;
		Object.keys(this.keyStates).forEach(function (element) {
			element = Number(element);
			that.keyStates[element] = (element === dir ? true : false);
		});
	}
	
	GameView.prototype.stopSquirrel = function (event) {
		var that = this;
		if (that.keyStates[event.keyCode] === true) {
			that.keyStates[event.keyCode] = false;
			that.game.squirrel.power([0, 0]);
		}
	}

})(this);