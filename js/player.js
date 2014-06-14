define(['crafty'], function(Crafty) {

  Crafty.c("Player", {
    init: function() {
	  var GRAVITY_CONSTANT = .3;
	  var DEFAULT_SPEED = 5;
	  var LEVEL_WIDTH = 900;
	  var jumpspeed = 0;
	  var ylast = -1; //The program compares the character's current y position to the y position last cycle to determine if he is on a platform.
	  var canjump = false;
	  var jumptapering = false; //Makes downward fall once up arrow is released smoother
	  var jumptimer = 0; //After a while, whether or not you're holding down the up key won't matter
	  var yaccel = 0;
	  var center = 0;
      this.requires('2D, Canvas, Color, Keyboard, Collision')
          .color('green')
		  .bind('EnterFrame', function() //EnterFrame event is called once per cycle
		  {
			//Moves left and right
			if(this.isDown('LEFT_ARROW')){this.x = this.x - DEFAULT_SPEED};
			if(this.isDown('RIGHT_ARROW')){this.x = this.x + DEFAULT_SPEED};
			//Keeps character from going off course
			if (this.x < 0){this.x = 0};
			if (this.x > LEVEL_WIDTH + this.w){this.x = LEVEL_WIDTH + this.w};
			//Gravity
			yaccel += GRAVITY_CONSTANT;
			if(!this.hit('PGrav'))
			{
				this.y += yaccel;
				//If we're falling into an object, we need to dig ourselves out
				while(this.hit('PGrav'))
				{
					this.y -= GRAVITY_CONSTANT;
					yaccel = 0;
				}
			}
			else
			{
				//The purpose of this block is to determine which side of whatever wall we're on so we don't jump through walls
				center = this.x;
				for(var i = 1; true; i++)
				{
					this.x = center - i;
					if(!this.hit('PGrav')){break;}
					this.x = center + i;
					if(!this.hit('PGrav')){break;}
				}
			}
			//Jumping
			canjump = (jumpspeed == 0 && ylast == this.y);
			ylast = this.y;
			if (this.isDown('UP_ARROW') && canjump)
			{
				jumpspeed = 10;
				canjump = false;
			}
			this.y -= jumpspeed;
			if(jumptapering && jumpspeed > 0)
			{
				jumpspeed -= 1;
				if(jumpspeed <= 0){jumptapering = false;}
			}
			if(canjump){jumptimer = 0;}
			if(!canjump && jumpspeed !=0 && !jumptapering)
			{
				jumptimer += 1;
				if(jumptimer > 30)
				{
					jumptimer = 0;
					jumptapering = true;
				}
			}
		  })
		  .bind('KeyUp', function(e)
		  {
			if (e.key == Crafty.keys['UP_ARROW']){
				if(jumptimer != 0){jumptapering = true;}
				jumptimer = 0;
			}
		  });
    }
  });

  return {
    createPlayer: function(attributes) {
      return Crafty.e('Player').attr(attributes);
    }
  };
});
