define(['crafty'], function(Crafty) {
  
  Crafty.c("Player", {
    init: function() {
      this.requires('2D, Canvas, Color, Gravity, Twoway')
          .twoway(5, 3)
          .color('green')
          .gravity("Floor");
    }
  });

  return {
    createPlayer: function(attributes) {
      return Crafty.e('Player').attr(attributes);
    }
  };
});
