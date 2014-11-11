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
      game.ship.power([0, 1]);
    });
    key("down, s", function() {
      game.ship.power([0, -1]);
    });
    key("right, d", function() {
      game.ship.power([-1, 0]);
    });
    key("left, a", function() {
      game.ship.power([1, 0]);
    });
  };


})(this);