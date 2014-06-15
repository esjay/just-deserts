define(['crafty'], function(Crafty){
  Crafty.c('Spike', {
    init: function() {
      this.requires('2D, Color, Canvas').color('green');
    }
  });

  return {
    createSpike: function(attributes) {
      return Crafty.e('Spike').attr(attributes);
    }
  };
});
