define(['crafty'], function(Crafty) {
  Game = {
    WIDTH: 1000,
    HEIGHT: 700,

    start: function() {
      Crafty.init(Game.WIDTH, Game.HEIGHT);

      Crafty.background('black');
      Crafty.c("Player", {
        init: function() {
          this.requires('2D, Canvas, Color, Gravity, Twoway')
              .attr({ x: 10, y: 10, w: 100, h: 100 })
              .twoway(5, 3)
              .color('green')
              .gravity("Floor");
        }
      });
      var box = Crafty.e('Player');

      var floor = Crafty.e("2D, Floor, Canvas, Color");
      floor.attr({ x: 0, y: 650, w: 1000, h: 25 })
           .color('blue');
    }
  };

  Game.start();
});
