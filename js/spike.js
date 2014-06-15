define(['crafty'], function(Crafty){
  Crafty.sprite("assets/img/spike.png", {spike_gfx:[0,0,40,40]});
  Crafty.c('Spike', {
    init: function() {
      this.requires('2D, Canvas, spike_gfx');
    }
  });

  return {
    createSpike: function(attributes) {
      return Crafty.e('Spike, Collision').attr(attributes).collision(new Crafty.polygon([0,0],[attributes.w,0],[attributes.w *.5, attributes.h]));
    }
  };
});
