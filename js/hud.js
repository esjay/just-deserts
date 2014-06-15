define(['crafty'], function(Crafty) {
  return {
    createText: function() {
      var x = 0,
          thirstY = 25,
          healthY = thirstY + 30,
          width = 150;
      this.thirstEl = Crafty.e("2D, DOM, HTML")
                      .attr({ x: x -(Crafty.viewport.x), y: thirstY, w: width})
                      .append("<div id=\"progressbar\"><div class=\"thrist\"></div></div>")
                      .bind("EnterFrame", function() {
                        this.attr({ x: x -(Crafty.viewport.x), y: thirstY });
                      });
      this.healthEl = Crafty.e("2D, DOM, HTML")
                .attr({ x: x -(Crafty.viewport.x), y: healthY, w: width})
                .replace("<div id=\"progressbar\"><div class=\"health\"></div></div>")
                .bind("EnterFrame", function() {
                  this.attr({ x: x -(Crafty.viewport.x), y: healthY });
                });
    },

    pushThirst: function(thirstVal, max) {
      var val = Math.round((thirstVal / max) * 100);
      document.getElementsByClassName('thrist')[0].style.width = "" + val + "%";
    },
    pushHealth: function(healthVal, max) {
      var val = Math.round((healthVal / max) * 100);
      document.getElementsByClassName('health')[0].style.width = "" + val + "%";
    }
  };
});
