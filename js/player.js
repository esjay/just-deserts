define(['crafty'], function(Crafty) {

  Crafty.c("Player", {
    init: function() {
      this.requires('2D, Canvas, Color, Gravity, Twoway')
      .twoway(5, 3)
      .color('green')
      .gravity("PGrav")
      .bind('EnterFrame', function() {
        //Keeps character from going off course
        if (this.x < 0) { this.x = 0; }
        if (this.x > 900) { this.x = 900; }
      });
    }
  });

  return {
    createPlayer: function(attributes) {
      return Crafty.e('Player').attr(attributes);
    }
  };
});
