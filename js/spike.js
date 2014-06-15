define(['crafty', './death'], function(Crafty, death){
  Crafty.sprite("assets/img/spike.png", {spike_gfx:[0,0,40,40]});
  Crafty.c('Spike', {
    init: function() {
      this.requires('2D, Canvas, spike_gfx');
    }
  });

  return {
    createSpike: function(attributes) {
      var hitbox = new Crafty.polygon([0,0], [attributes.w,0], [attributes.w * 0.5, attributes.h]),
          entity = Crafty.e('Spike, Collision, Particles').attr(attributes)
		  .collision(hitbox)
		  .onHit("Player", function()
		  {
			//var d = Crafty.e("Death");
			death.createDeath(attributes);
		  });
      if(attributes.flipped) entity.flip('Y')
      return entity;
    }
  };
});
