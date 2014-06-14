define(['crafty', '../player'], function(Crafty, player) {
  Game = {
    WIDTH: 1000,
    HEIGHT: 700,

    start: function() {
      Crafty.init(Game.WIDTH, Game.HEIGHT);

      Crafty.background('black');

      var box = player.createPlayer({ x: 10, y: 10, w: 100, h: 100 });

      var floor = Crafty.e("2D, Floor, Canvas, Color");
      floor.attr({ x: 0, y: 650, w: 1000, h: 25 })
           .color('blue');
    }
  };

  Game.start();
});
