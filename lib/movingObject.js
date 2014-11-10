(function (rootObject) {
  var Asteroids = rootObject.Asteroids = rootObject.Asteroids || {};
  var MovingObject = Asteroids.MovingObject = function () {
    var params = arguments[0][0];
    this.pos = params['pos'];
    this.vel = params['vel'];
    this.radius = params['radius'];
    this.color = params['color'];
  };
  
  MovingObject.prototype.resetPos = function(ctx) {
    if (this.pos[0] > ctx.canvas.clientWidth) {
      this.pos[0] = 0;
    }
    if (this.pos[1] > ctx.canvas.clientHeight) {
      this.pos[1] = 0;
    }
  };
  
  
  MovingObject.prototype.draw = function(ctx) {
    ctx.fillStyle = this.color;
    ctx.beginPath();
    this.resetPos(ctx);
    ctx.arc(
      this.pos[0],
      this.pos[1],
      this.radius,
      0,
      2 * Math.PI,
      false
    );
    
    ctx.fill();
  };
  
  MovingObject.prototype.move  = function() {
    this.pos[0] += this.vel[0];
    this.pos[1] += this.vel[1];
    
  };
  
})(this);