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
    } else if (this.pos[0] < 0) {
      this.pos[0] = ctx.canvas.clientWidth;
    }
    if (this.pos[1] > ctx.canvas.clientHeight) {
      this.pos[1] = 0;
    } else if (this.pos[1] < 0) {
      this.pos[1] = ctx.canvas.clientHeight;
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
  
  function distance(pos1, pos2) {
    var x1 = pos1[0], x2 = pos2[0], y1 = pos1[1], y2 = pos2[1];
    return Math.sqrt(Math.pow((x1 - x2), 2) + Math.pow((y1 - y2), 2));
  }
  
  MovingObject.prototype.isCollidedWith = function(otherObject) {
    var sumOfRadii = otherObject.radius + this.radius;
    var dist = distance(this.pos, otherObject.pos);
    if(dist < sumOfRadii) {
      return true;
    } else {
      return false;
    }
  };
  
  MovingObject.prototype.move  = function() {
    this.pos[0] += this.vel[0];
    this.pos[1] += this.vel[1];
    
  };
  
})(this);