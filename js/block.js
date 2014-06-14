define(['crafty'], function(Crafty) {

  Crafty.c('Block', {
    init: function() {
      this.requires('2D, Canvas, Color, PGrav').color('red');
    }
  });

  return {
    createBlock: function(attributes) {
        return Crafty.e('Block').attr(attributes);
    }
  };
});
