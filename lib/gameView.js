(function(rootObject) {
  var Asteroids = rootObject.Asteroids = rootObject.Asteroids || {};
  
  var GameView = Asteroids.GameView = function(game, ctx) {
    this.game = game;
    this.ctx = ctx;
  };
  
  GameView.prototype.start = function() {
    var that = this;
    this.bindKeyHandlers();
    rootObject.setInterval(function() {
      that.game.step();
      that.game.draw(that.ctx);
    }, 20);
  };
  
  GameView.prototype.bindKeyHandlers = function() {
    var game = this.game;
    
    key("up, w", function() {
      game.ship.power([0, -1]);
    });
    key("down, s", function() {
      game.ship.power([0, 1]);
    });
    key("right, d", function() {
      game.ship.power([1, 0]);
			// game.ship.twist("right");
    });
    key("left, a", function() {
      game.ship.power([-1, 0]);
			// game.ship.twist("left");
    });
    key("space", function() {
			if(game.ship.vel[0] !== 0 || game.ship.vel[1] !== 0) {
        game.addBullet(game.ship.vel.slice(0), game.ship.pos.slice(0));
		  }
    });
  };


})(this);