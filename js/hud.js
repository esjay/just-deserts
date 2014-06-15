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
      var widthPercent = "" + ((10000 / 10000) * 100) + "%";
      this.healthEl = Crafty.e("2D, DOM, HTML")
                .attr({ x: x -(Crafty.viewport.x), y: healthY, w: width})
                .replace("<div id=\"progressbar\"><div class=\"health\"></div></div>")
                .bind("EnterFrame", function() {
                  this.attr({ x: x -(Crafty.viewport.x), y: healthY });
                });
    },

    pushThirst: function(thirstVal) {
      var val = Math.round((thirstVal / 1000) * 100);
      document.getElementsByClassName('thrist')[0].style.width = "" + val + "%";
    },
    pushHealth: function(healthVal) {
      var val = Math.round((healthVal / 1000) * 100);
      document.getElementsByClassName('health')[0].style.width = "" + val + "%";
    }
  };
});
