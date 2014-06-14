define(['crafty'], function(Crafty) {

  Crafty.c("Player", {
    init: function() {
	  var GRAVITY_CONSTANT = .5;
	  var DEFAULT_SPEED = 5;
	  var LEVEL_WIDTH = 950;
	  var JUMPSPEED = 14;
	  var canjump = false;
	  var yaccel = 0;
	  var reset_yaccel = false;
      this.requires('2D, Canvas, Color, Keyboard, Collision, Player')
          .color('green')
		  .bind('EnterFrame', function() //EnterFrame event is called once per cycle
		  {
			//Moves left and right
			if(this.isDown('LEFT_ARROW'))
			{
				this.x -= DEFAULT_SPEED;
				if(this.hit('PGrav')){this.x += DEFAULT_SPEED};
			}
			if(this.isDown('RIGHT_ARROW'))
			{
				this.x += DEFAULT_SPEED;
				if(this.hit('PGrav')){this.x -= DEFAULT_SPEED};
			}
			//
			//Keeps character from going off course
			if (this.x < 0){this.x = 0};
			if (this.x > LEVEL_WIDTH + this.w){this.x = LEVEL_WIDTH + this.w};
			//Gravity
			yaccel += GRAVITY_CONSTANT;
			if (!this.hit('PGrav'))
			{
				this.y += yaccel;
				//If we're falling into an object, we need to dig ourselves out
				while(this.hit('PGrav'))
				{
					reset_yaccel = true;
					if(yaccel > 0)
					{
						canjump = true;
						this.y -= GRAVITY_CONSTANT;
					}
					if(yaccel < 0)
					{
						canjump = false;
						this.y += GRAVITY_CONSTANT;
					}
				}
				if(reset_yaccel)
				{
					yaccel = 0;
					reset_yaccel = false;
				}
				else {canjump = false;}//Prevent air jumps. You can't jump if you're not falling downward into a platform
			}
			//Jumping
			if (this.isDown('UP_ARROW') && canjump)
			{
				yaccel -= JUMPSPEED;
				canjump = false;
			}
      this.doTick();
		  })
		  .bind('KeyUp', function(e)
		  {
			if (e.key == Crafty.keys['UP_ARROW'] && yaccel < 0)
			{
				yaccel = 0;
			}
		  });

    },
    thirst: 0,
    health: 10000,
    shaded: false,
    increaseThirst: function() {
      this.thirst++;
      return this;
    },
    damageBy: function(damageAmount) {
      damageAmount = damageAmount || 1;
      this.health -= damageAmount;
      // console.log("health is", this.health);
      return this;
    },
    markAsShaded: function(value) {
      this.shaded = value;
    },
    markAsUnshaded: function() {
      this.shaded = false;
    },
    doTick: function() {
      if(!this.shaded) {
        this.damageBy(1);
      }
      this.increaseThirst();
    }
  });

  return {
    createPlayer: function(attributes) {
      return Crafty.e('Player').attr(attributes);
    }
  };
});
