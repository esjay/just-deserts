define(['crafty', '../world', '../levels/level1'],
 function(Crafty, world, worldData) {
  Game = {

    start: function() {
      world.createWorld(worldData);
    }
  };

  Game.start();
});
