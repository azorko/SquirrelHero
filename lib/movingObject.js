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
		if (this instanceof Asteroids.Bullet) {
      //do nothing
	  } else if (this.pos[0] > ctx.canvas.clientWidth) {
      this.pos[0] = 0;
    } else if (this.pos[0] < 0) {
      this.pos[0] = ctx.canvas.clientWidth;
    }
		if (this instanceof Asteroids.Bullet) {
      //do nothing
	  } else if (this.pos[1] > ctx.canvas.clientHeight) {
      this.pos[1] = 0;
    } else if (this.pos[1] < 0) {
      this.pos[1] = ctx.canvas.clientHeight;
    }
  };
  
  MovingObject.prototype.draw = function(ctx) {
    ctx.fillStyle = this.color;
		this.resetPos(ctx);
		ctx.beginPath();
		
		// if (this instanceof Asteroids.Ship) {
// 	    ctx.moveTo(this.pos[0], this.pos[1]);
// 	    ctx.lineTo(this.pos2[0], this.pos2[1]);
// 	    ctx.lineTo(this.pos3[0], this.pos3[1]);
// 		}
			if (this instanceof Asteroids.Bullet) {
				ctx.drawImage(this.image, this.pos[0], this.pos[1]);
      } else if (this instanceof Asteroids.Ship) {
      	ctx.drawImage(this.image, this.pos[0], this.pos[1]);
      } else if (this instanceof Asteroids.Asteroid) {
				ctx.drawImage(this.image, this.pos[0], this.pos[1]);
				// ctx.moveTo(this.pos[0] - this.radius, this.pos[1]);
// 				ctx.lineTo(this.pos[0] - this.radius / 2, this.pos[1] + this.radius);
// 			  ctx.lineTo(this.pos[0] + this.radius, this.pos[1] + this.radius / 2);
// 			  ctx.lineTo(this.pos[0] + this.radius, this.pos[1] - this.radius);
// 				ctx.lineTo(this.pos[0] - this.radius / 2, this.pos[1] - this.radius);
			} else {
		    ctx.arc(
		      this.pos[0],
		      this.pos[1],
		      this.radius,
		      0,
		      2 * Math.PI,
		      false
		    );
			}
    
    ctx.fill();
  };
  
  function distance(pos1, pos2) {
    var x1 = pos1[0], x2 = pos2[0], y1 = pos1[1], y2 = pos2[1];
    return Math.sqrt(Math.pow((x1 - x2), 2) + Math.pow((y1 - y2), 2));
  }
  
  MovingObject.prototype.isCollidedWith = function(otherObject) {
    var sumOfRadii = Number(otherObject.radius) + Number(this.radius);
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
    // if(this instanceof Asteroids.Ship) {
// 	    this.pos2[0] += this.vel[0];
// 	    this.pos2[1] += this.vel[1];
// 	    this.pos3[0] += this.vel[0];
// 	    this.pos3[1] += this.vel[1];
// 		}
  };
  
})(this);