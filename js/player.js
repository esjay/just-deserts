define(['crafty', './components/vitality', './components/scrollview'], function(Crafty) {

  Crafty.c("Player", {

    init: function() {
	  var GRAVITY_CONSTANT = 0.5,
        DEFAULT_SPEED = 5,
        levelWidth = 1820,
        JUMPSPEED = 14,
        canjump = false,
        yaccel = 0,
        reset_yaccel = false;

      this.requires('2D, Canvas, Color, Keyboard, Vitality, ScrollView')
          .color('green')
		  .bind('EnterFrame', function() //EnterFrame event is called once per cycle
		  {
			//Moves left and right
			if(this.isDown('LEFT_ARROW'))
			{
				this.x -= DEFAULT_SPEED;
				if(this.hit('PGrav')){this.x += DEFAULT_SPEED;}//Don't move if you will end up overlapping a wall
				// if (400 <= this.x) {
				// 	Crafty.viewport.scroll('x', Crafty.viewport.x + DEFAULT_SPEED);
				// }
			}
			if(this.isDown('RIGHT_ARROW'))
			{
				this.x += DEFAULT_SPEED;
				if(this.hit('PGrav')){this.x -= DEFAULT_SPEED;}
				// if (400 <= this.x && (this.x + this.w) - 1000 <= this.levelWidth) {
				// 	Crafty.viewport.scroll('x', Crafty.viewport.x - DEFAULT_SPEED);
				// }
			}
			//Keeps character from going off course
			if (this.x < 0){this.x = 0};
			if ((this.x + this.w) > levelWidth){this.x = levelWidth - this.w};
			//Gravity
			yaccel += GRAVITY_CONSTANT;
			//This block handles hitting a platform from the top or bottom
			if (!this.hit('PGrav'))
			{
				this.y += yaccel;
				//If we're falling into an object, we need to dig ourselves out, and vice versa
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
		  })
		  .bind('KeyUp', function(e)
		  {
			if (e.key == Crafty.keys['UP_ARROW'] && yaccel < 0)
			{
				yaccel = 0;
			}
		  });
    },
    setLevelData: function(data) {
      this.levelWidth = data.width;
      return this;
    }
  });

  return {
    createPlayer: function(attributes, leveldata) {
      return Crafty.e('Player').setLevelData(leveldata).attr(attributes);
    }
  };
});
