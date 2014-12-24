(function(rootObject) {
  var Asteroids = rootObject.Asteroids = rootObject.Asteroids || {};
  
  var GameView = Asteroids.GameView = function(game, ctx, el) {
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
      game.ship.power([0, -2]);
    });
    key("down, s", function() {
      game.ship.power([0, 2]);
    });
    key("right, d", function() {
      game.ship.power([2, 0]);
    });
    key("left, a", function() {
      game.ship.power([-2, 0]);
    });
    key("space", function() {
			if(game.ship.vel[0] !== 0 || game.ship.vel[1] !== 0) {
        game.addBullet(game.ship.vel.slice(0), game.ship.pos.slice(0));
		  }
    });
  };


})(this);