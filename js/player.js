define(['crafty'], function(Crafty) {

  Crafty.c("Player", {
    init: function() {
	  var DEFAULT_SPEED = 5;
	  var jumpspeed = 0;
	  var ylast = -1;
	  var canjump = false;
	  var jumptapering = false; //Makes downward fall once up arrow is released smoother
	  var jumptimer = 0; //After a while, whether or not you're holding down the up key won't matter
      this.requires('2D, Canvas, Color, Gravity, Keyboard, Collision') //Twoway')
          //.twoway(5, 3)
          .color('green')
          .gravity("PGrav")
		  .bind('EnterFrame', function() //EnterFrame event is called once per cycle
		  {
			//Moves left and right
			if(this.isDown('LEFT_ARROW')){this.x = this.x - DEFAULT_SPEED};
			if(this.isDown('RIGHT_ARROW')){this.x = this.x + DEFAULT_SPEED};
			//Keeps character from going off course
			if (this.x < 0){this.x = 0}; 
			if (this.x > 900){this.x = 900};
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
