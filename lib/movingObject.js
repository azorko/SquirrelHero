(function (rootObject) {
  var SquirrelHero = rootObject.SquirrelHero = rootObject.SquirrelHero || {};
  var MovingObject = SquirrelHero.MovingObject = function () {
    var params = arguments[0][0];
    this.pos = params['pos'];
    this.vel = params['vel'];
    this.radius = params['radius'];
		this.fall = params['fall'];
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
	  }
		ctx.beginPath();
		ctx.drawImage(this.image, this.pos[0], this.pos[1]);
    ctx.fill();
  };
  
  function distance(pos1, pos2) {
    var x1 = pos1[0], x2 = pos2[0], y1 = pos1[1], y2 = pos2[1];
    return Math.sqrt(Math.pow((x1 - x2), 2) + Math.pow((y1 - y2), 2));
  }
  
  MovingObject.prototype.isCollidedWith = function(otherObject) {
		var dist;
		// if (this instanceof SquirrelHero.Squirrel || otherObject instanceof SquirrelHero.Squirrel) { return false; }
		if (this instanceof SquirrelHero.FlyingCow) {
			var actualPos = [this.pos[0] + 63.5, this.pos[1] + 38.5];
			dist = distance(actualPos, otherObject.pos);
		} else if (otherObject instanceof SquirrelHero.FlyingCow) {
			var actualPos = [otherObject.pos[0] + 63.5, otherObject.pos[1] + 38.5];
		  dist = distance(this.pos, actualPos);
		} else if (this instanceof SquirrelHero.Squirrel && otherObject instanceof SquirrelHero.Bomb) {
			var thisActualPos = [this.pos[0] + 38.5, this.pos[1] + 27];
			var otherActualPos = [otherObject.pos[0] + 35, otherObject.pos[1] + 80];
			dist = distance(thisActualPos, otherActualPos);
		} else if (otherObject instanceof SquirrelHero.Squirrel && this instanceof SquirrelHero.Bomb) {
			var thisActualPos = [this.pos[0] + 35, this.pos[1] + 80];
			var otherActualPos = [otherObject.pos[0] + 38.5, otherObject.pos[1] + 27];
			dist = distance(thisActualPos, otherActualPos);
		}
    var sumOfRadii = Number(otherObject.radius) + Number(this.radius);
    dist = dist || distance(this.pos, otherObject.pos);
    if(dist < sumOfRadii) {
      return true;
    } else {
      return false;
    }
  };
  
  MovingObject.prototype.move = function() {
      this.pos[0] += this.vel[0];
      this.pos[1] += this.vel[1];
  };
  
})(this);