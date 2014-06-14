define(['crafty'], function(Crafty) {

  Crafty.c("Player", {

    init: function() {
      var GRAVITY_CONSTANT = 0.3,
          DEFAULT_SPEED = 5,
          levelWidth = 1820,
          jumpspeed = 0,
          canjump = false,
          jumptapering = false, //Makes downward fall once up arrow is released smoother
          jumptimer = 0, //After a while, whether or not you're holding down the up key won't matter
          yaccel = 0,
          center = 0;

      this.requires('2D, Canvas, Color, Keyboard, Collision')
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
			if ((this.x + this.w) > levelWidth){this.x = levelWidth - this.w};
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
			//Jumping
			canjump = yaccel == 0 ;
			if (this.isDown('UP_ARROW') && canjump)
			{
				jumpspeed = 10;
				canjump = false;
			}
			this.y -= jumpspeed;
			if(this.hit('PGrav'))
			{
				while(this.hit('PGrav'))
				{
					this.y += 1;
					jumpspeed = 0;
					jumptapering = false;
					yaccel = 0;
					jumptimer = 0;
				}
			}
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
    },
    setLevelData: function(data) {
      this.levelWidth = data.width;
      return this;
    },
  });

  return {
    createPlayer: function(attributes, leveldata) {
      return Crafty.e('Player').setLevelData(leveldata).attr(attributes);
    }
  };
});
