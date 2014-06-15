define(['crafty', './components/vitality', './components/scrollview'], function(Crafty) {
  Crafty.sprite(56, 72, "assets/img/character-animation.png", {
      PlayerSprite: [1,0]
  });

  Crafty.c("Player", {

    init: function() {
	  var GRAVITY_CONSTANT = 0.5,
        DEFAULT_SPEED = 5,
        JUMPSPEED = 14,
        canjump = false,
        yaccel = 0,
        reset_yaccel = false,
		die_next_cycle = false;
        worldData = {};

      this.requires('2D, Canvas, Keyboard, Vitality, ScrollView, SpriteAnimation, character_gfx, Delay, PlayerSprite')
      .reel('PlayerJumping', 1000, 0, 0, 62)
      .reel('PlayerWaiting', 1000, 0, 1, 62)
      .reel('PlayerWalking', 1000, 0, 2, 62)
		  .bind('EnterFrame', function() //EnterFrame event is called once per cycle
		  {
			if (die_next_cycle)
			{
				die_next_cycle = false;
				this.reset();
			}
			//Moves left and right
			if(this.isDown('LEFT_ARROW'))
			{
				this.x -= DEFAULT_SPEED;
        if(this.isPlaying('PlayerWalking')) {
          this.resumeAnimation();
        } else {
          this.animate('PlayerWalking', -1);
        }
				if(this.hit('PGrav')){
          this.animate('PlayerWalking', -1);
          this.x += DEFAULT_SPEED;
        }//Don't move if you will end up overlapping a wall
			}
			if(this.isDown('RIGHT_ARROW'))
			{
        if(canjump) {
          if(this.isPlaying('PlayerWalking')) {
            this.resumeAnimation();
          } else {
            this.animate('PlayerWalking', -1);
          }
        }
				this.x += DEFAULT_SPEED;
				if(this.hit('PGrav')){
          this.animate('PlayerWalking', -1);
          this.x -= DEFAULT_SPEED;
        }
			}
			//Keeps character from going off course
			if (this.x < 0){this.x = 0};
			if ((this.x + this.w) > worldData.width){this.x = worldData.width - this.w};
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
        this.animate('PlayerJumping', 1);
			}
		  })
		  .bind('KeyUp', function(e)
		  {
        if(this.isPlaying('PlayerJumping')) {
          this.resumeAnimation()
              .on("AnimationEnd", function() {
                this.animate('PlayerWaiting', -1);
              });
        } else {
          this.animate('PlayerWaiting', -1);
        }

  			if (e.key == Crafty.keys['UP_ARROW'] && yaccel < 0)
  			{
  				yaccel = 0;
  			}
		  })
      .onHit('Spike', function() {
        die_next_cycle = true;
      })
      .onHit('EndArea', function() {
          Crafty.enterScene('GameOver', this.health);
      });
    },

    reset: function() {
      this.resetVitality();
      this.resetScroll();
      this.x = this.worldData.start.x;
      this.y = this.worldData.start.y;
    },
    setWorldData: function(data) {
      this.worldData = data;
      return this;
    }
  });

  return {
    createPlayer: function(attributes, worldData) {
      return Crafty.e('Player').attr(attributes).setWorldData(worldData)
      .animate('PlayerWaiting', -1);
    }
  };
});
