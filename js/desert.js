define(['crafty'], function(Crafty) {
  Game = {
    start: function() {
      Crafty.init(300, 300);

      Crafty.background('black');

      var box = Crafty.e('2D, Canvas, Color')
        .attr({
          x: 10, y: 10, w: 100, h: 100
        })
        .color('green');
    }
  };
  Game.start();
});
