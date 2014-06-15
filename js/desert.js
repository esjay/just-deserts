define(['crafty', '../world', '../levels/level1', '../hud'],
 function(Crafty, world, worldData, hud) {
   Crafty.defineScene('Game', function() {
     world.createWorld(worldData);
     hud.createText();
   });

   Crafty.defineScene('GameOver', function(score) {
     Crafty.viewport.scroll('x', 0);
     Crafty.e('2D, Canvas, DOM, Color, Text, Keyboard')
           .attr({ x: 250, y: 400, w: 100, h: 20})
           .textFont({family: "Georgia", size: 18})
           .text("You Survived with " + Math.round(score) + " health.\n  Press Spacebar to restart.")
		   .bind('KeyDown', function(e) {
				if(e.key == Crafty.keys.SPACE) {Crafty.enterScene('Game');}
				})
   });

  Crafty.enterScene('Game');
});
