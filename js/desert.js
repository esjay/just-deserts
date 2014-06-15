define(['crafty', '../world', '../levels/level1', '../hud'],
 function(Crafty, world, worldData, hud) {
  Game = {

    start: function() {
      world.createWorld(worldData);
      hud.createText();
    }
  };

  Game.start();
});
