(function(rootObject) {
  var Asteroids = rootObject.Asteroids = rootObject.Asteroids || {};
  
  var GameView = Asteroids.GameView = function(game, ctx) {
    this.game = game;
    this.ctx = ctx;
  };
  
  GameView.prototype.start = function() {
    var that = this;
    rootObject.setInterval(function() {
      that.game.moveObjects();
      that.game.draw(that.ctx);
    }, 20);
    
    
  };


})(this);