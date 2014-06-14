define(['crafty'], function(Crafty) {

  Crafty.c("Player", {
    init: function() {
	  var GRAVITY_CONSTANT = .3;
	  var DEFAULT_SPEED = 5;
	  var LEVEL_WIDTH = 950;
	  var jumpspeed = 0;
	  var canjump = false;
	  var jumptapering = false; //Makes downward fall once up arrow is released smoother
	  var jumptimer = 0; //After a while, whether or not you're holding down the up key won't matter
	  var yaccel = 0;
	  var center = 0;
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
      this.doTick();
		  })
		  .bind('KeyUp', function(e)
		  {
			if (e.key == Crafty.keys['UP_ARROW']){
				if(jumptimer != 0){jumptapering = true;}
				jumptimer = 0;
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
