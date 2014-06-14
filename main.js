Game = {

  start: function() {
    Crafty.init(1000, 700);

    Crafty.background('black');

    var box = Crafty.e('2D, Canvas, Color, Fourway')
      .attr({
        x: 10, y: 10, w: 100, h: 100
      })
      .color('green')
	  .fourway(10);
  }
};
