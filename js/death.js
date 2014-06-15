define(['crafty'], function(Crafty){
  Crafty.c('Death', {
    init: function() {
      this.requires('2D, Canvas');
    }
  });

  return {
    createDeath: function(attributes) {
		var options = 
	  {
		maxParticles: 500,
		size: 18,
		sizeRandom: 4,
		speed: 40,
		speedRandom: 1.2,
		// Lifespan in frames
		lifeSpan: 200,
		lifeSpanRandom: 0,
		// Angle is calculated clockwise: 12pm is 0deg, 3pm is 90deg etc.
		angle: 0,
		angleRandom: 180,
		startColour: [255, 0, 0, 255],
		startColourRandom: [0, 0, 0, 0],
		endColour: [255, 0, 0, 255],
		endColourRandom: [0, 0, 0, 0],
		// Only applies when fastMode is off, specifies how sharp the gradients are drawn
		sharpness: 20,
		sharpnessRandom: 10,
		// Random spread from origin
		spread: 20,
		// How many frames should this last
		duration: 20,
		// Will draw squares instead of circle gradients
		fastMode: false,
		gravity: { x: 0, y: 1 },
		// sensible values are 0-3
		jitter: 0
	   }
	   var lifetimer = 0;
           entity = Crafty.e('Death, Collision, Particles').attr(attributes)
		   .particles(options)
		  .bind('EnterFrame', function()
		  {
			lifetimer += 1;
			if(lifetimer >= 81){this.destroy();}
		  })
		  ;
      if(attributes.flipped) entity.flip('Y')
      return entity;
    }
  };
});
