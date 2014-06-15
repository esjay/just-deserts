define(['crafty', '../world', '../levels/level1', '../hud'],
 function(Crafty, world, worldData, hud) {
   Crafty.defineScene('Game', function() {
     world.createWorld(worldData);
     hud.createText();
   });

   Crafty.defineScene('GameOver', function(score) {
     Crafty.viewport.scroll('x', 0);
     Crafty.e('2D, Canvas, DOM, Color, Text')
           .attr({ x: 500, y: 400, w: 100, h: 20})
           .text("Game Over: " + score);
   });

  Crafty.enterScene('Game');
});
