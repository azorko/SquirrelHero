(function (rootObject) {
  var Asteroids = rootObject.Asteroids = rootObject.Asteroids || {};
  
  var Ship = Asteroids.Ship = function() {
    Asteroids.MovingObject.call(this, arguments);
    this.color = Ship.COLOR;
    this.radius = Ship.RADIUS;
    this.vel = [0, 0];
		this.lives = 3;
		// this.dir = "up";
// 		this.pos2 = [this.pos[0] + 20, this.pos[1] + 20];
// 		this.pos3 = [this.pos[0] - 20, this.pos[1] + 20];
  };
  
  Ship.inherits(Asteroids.MovingObject);
  
  Ship.COLOR = "red";
  Ship.RADIUS = "10";
  
  Ship.prototype.relocate = function () {
    this.pos = Asteroids.Game.randomPos();
		// if(this.dir === "up") {
// 			this.pos2 = [this.pos[0] + 20, this.pos[1] + 20];
// 	    this.pos3 = [this.pos[0] - 20, this.pos[1] + 20];
// 		} else if (this.pos === "down") {
// 			this.pos2 = [this.pos[0] + 20, this.pos[1] - 20];
// 			this.pos3 = [this.pos[0] - 20, this.pos[1] - 20];
// 		} else if (this.pos === "right") {
// 			this.pos2 = [this.pos[0] - 20, this.pos[1] + 20];
// 			this.pos3 = [this.pos[0] - 20, this.pos[1] - 20];
// 		} else if (this.pos === "left") {
// 			this.pos2 = [this.pos[0] + 20, this.pos[1] - 20];
// 			this.pos3 = [this.pos[0] + 20, this.pos[1] + 20];
// 		}
    this.vel = [0, 0];
  };
  
  Ship.prototype.power = function(impulse) {
    this.vel[0] += impulse[0];
    this.vel[1] += impulse[1];
  };
	
	// Ship.prototype.twist = function(twistDir) {
// 	  if (this.dir === "up") {
// 		  if(twistDir === "right") {
// 			  this.dir = "right";
// 				this.pos = [this.pos[0] + 20, this.pos[1] + 20];
// 				this.pos2 = [this.pos[0] - 20, this.pos[1] + 20];
// 				this.pos3 = [this.pos[0] - 20, this.pos[1] - 20];
// 			} else {
// 			  this.dir = "left";
// 				this.pos = [this.pos[0] - 20, this.pos[1] + 20];
// 				this.pos2 = [this.pos[0] + 20, this.pos[1] - 20];
// 				this.pos3 = [this.pos[0] + 20, this.pos[1] + 20];
// 			}
// 		} else if (this.dir === "right") {
// 		  if(twistDir === "right") {
// 			  this.dir = "down";
// 				this.pos = [this.pos[0] - 20, this.pos[1] + 20];
// 				this.pos2 = [this.pos[0] + 20, this.pos[1] - 20];
// 				this.pos3 = [this.pos[0] - 20, this.pos[1] - 20];
// 			} else {
// 			  this.dir = "up";
// 				this.pos = [this.pos[0] - 20, this.pos[1] - 20];
// 				this.pos2 = [this.pos[0] + 20, this.pos[1] + 20];
// 		    this.pos3 = [this.pos[0] - 20, this.pos[1] + 20];
// 			}
// 		} else if (this.dir === "down") {
// 		  if(twistDir === "right") {
// 			  this.dir = "left";
// 				this.pos = [this.pos[0] - 20, this.pos[1] - 20];
// 				this.pos2 = [this.pos[0] + 20, this.pos[1] - 20];
// 				this.pos3 = [this.pos[0] + 20, this.pos[1] + 20];
// 			} else {
// 			  this.dir = "right";
// 				this.pos = [this.pos[0] + 20, this.pos[1] - 20];
// 				this.pos2 = [this.pos[0] - 20, this.pos[1] + 20];
// 				this.pos3 = [this.pos[0] - 20, this.pos[1] - 20];
// 			}
// 		} else if (this.dir === "left") {
// 		  if(twistDir === "right") {
// 			  this.dir = "up";
// 				this.pos = [this.pos[0] + 20, this.pos[1] - 20];
// 				this.pos2 = [this.pos[0] + 20, this.pos[1] + 20];
// 		    this.pos3 = [this.pos[0] - 20, this.pos[1] + 20];
// 			} else {
// 			  this.dir = "down";
// 				this.pos = [this.pos[0] + 20, this.pos[1] + 20];
// 				this.pos2 = [this.pos[0] + 20, this.pos[1] - 20];
// 				this.pos3 = [this.pos[0] - 20, this.pos[1] - 20];
// 			}
// 		}
// 	};

})(this); 
  
  
  