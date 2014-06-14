define(['crafty', '../world', '../levels/level1'],
 function(Crafty, world, worldData) {
  Game = {

    start: function() {

      world.createWorld(worldData);

      var floor = Crafty.e("2D, PGrav, Canvas, Color");
      floor.attr({ x: 0, y: 650, w: 1000, h: 25 })
           .color('blue');
    }
  };

  Game.start();
});
