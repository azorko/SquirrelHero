(function(rootObject) {
  var SquirrelHero = rootObject.SquirrelHero = rootObject.SquirrelHero || {};
  
  var GameView = SquirrelHero.GameView = function(game, ctx, el) {
    this.game = game;
    this.ctx = ctx;
		this.$el = el;
  };
  
  GameView.prototype.start = function() {
    var that = this;
    this.bindKeyHandlers();
		
		$("#game-start-modal").modal("toggle");
		
		$('#start-button').on('click', function (event) {
			event.preventDefault();
			$("#game-start-modal").modal("toggle");
			$(".game-stats").removeClass("hidden");
	    var intervalInd = rootObject.setInterval(function() {
	      that.game.step(intervalInd);
	      that.game.draw(that.ctx);
				that.game.gameStats();
	    }, 20);
		});
  };
  
  GameView.prototype.bindKeyHandlers = function() {
    var game = this.game;
    
    key("up, w", function() {
		  if (game.squirrel.pos[1] >= 0) {
        game.squirrel.power([0, -2]);
		  }
    });
    key("down, s", function() {
			if (game.squirrel.pos[1] <= ctx.canvas.clientHeight - 68) {
        game.squirrel.power([0, 2]);
		  }
    });
    key("right, d", function() {
			if (game.squirrel.pos[0] <= ctx.canvas.clientWidth - 95) {
        game.squirrel.power([2, 0]);
		  }
    });
    key("left, a", function() {
			if (game.squirrel.pos[0] >= 0) {
        game.squirrel.power([-2, 0]);
		  }
    });
    key("space", function() {
			if (game.squirrel.acorns > 0) {
        game.addAcorn(game.squirrel.vel.slice(0), game.squirrel.pos.slice(0));
		  }
    });
  };


})(this);