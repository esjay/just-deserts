define(['crafty', './death'], function(Crafty, death){
  Crafty.sprite("assets/img/rail_spike_large.png", {spike_gfx:[0,0,40,80]});
  Crafty.c('Spike', {
    init: function() {
      this.requires('2D, Canvas, spike_gfx');
    }
  });

  return {
    createSpike: function(attributes) {
      var hitbox = new Crafty.polygon([0,0], [attributes.w,0], [attributes.w * 0.5, attributes.h]),
          entity = Crafty.e('Spike, Collision').attr(attributes).collision(hitbox)
		  .onHit("Player", function()
		  {
			death.createDeath(attributes);
		  });
      if(attributes.rotation >= 0) {
        entity.y += attributes.h;
        entity.x += attributes.w;
      }
      return entity;
    }
  };
});
