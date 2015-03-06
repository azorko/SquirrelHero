(function (rootObject) {
  var SquirrelHero = rootObject.SquirrelHero = rootObject.SquirrelHero || {};
  
	var MovingObject = SquirrelHero.MovingObject = function () {
    var params = arguments[0][0];
    this.pos = params['pos'];
		this.fall = params['fall'];
    this.vel = params['vel'];
    this.radius = this.getRadius();
  };
  
  MovingObject.prototype.resetVelocity = function(ctx) {
	  if (this.pos[0] > ctx.canvas.clientWidth - 95) {
      this.pos[0] = ctx.canvas.clientWidth - 95;
			this.vel = [0, 0];
    } else if (this.pos[0] < 0) {
      this.pos[0] = 0;
			this.vel = [0, 0];
    }
		
		if (this.pos[1] > ctx.canvas.clientHeight - 68) {
      this.pos[1] = ctx.canvas.clientHeight - 68;
			this.vel = [0, 0];
    } else if (this.pos[1] < 0) {
      this.pos[1] = 0;
			this.vel = [0, 0];
    }
  };
  
  MovingObject.prototype.draw = function(ctx) {
    ctx.fillStyle = this.color;
		if (this instanceof SquirrelHero.Squirrel) {
		  this.resetVelocity(ctx);
			ctx.globalCompositeOperation ='destination-over'; //sort of like setting z-index of Squirrel to top level
	  }
		ctx.beginPath();
		ctx.drawImage(this.image, this.pos[0], this.pos[1]);
    ctx.fill();
  };
  
  function distance(pos1, pos2) {
    var x1 = pos1[0], x2 = pos2[0], y1 = pos1[1], y2 = pos2[1];
    return Math.sqrt(Math.pow((x1 - x2), 2) + Math.pow((y1 - y2), 2));
  }
	
	//lefthand top corner position - [x, y], x - half width, y - half height to get center position
	MovingObject.prototype.getCenter = function() {
		return [this.pos[0] + this.width / 2, this.pos[1] + this.height / 2];
	};
	
	
	//radius is average of width & height
	MovingObject.prototype.getRadius = function() {
		return (this.width + this.height) / 2;
	};
  
  MovingObject.prototype.isCollidedWith = function(otherObject) {
		var dist, sumOfRadii;

    sumOfRadii = Number(otherObject.radius) + Number(this.radius);
		dist = distance(this.getCenter(), otherObject.getCenter());
    return (dist < sumOfRadii ? true : false);
  };
  
  MovingObject.prototype.move = function() {
      this.pos[0] += this.vel[0];
      this.pos[1] += this.vel[1];
  };
  
})(this);