define(['crafty'], function(Crafty) {
  return {
    createText: function() {
      this.thirstEl = Crafty.e("2D, DOM, Text")
                      .attr({ x: 100 -(Crafty.viewport.x), y: 100 })
                      .textFont({family: "Georgia", size: 18})
                      .text("Thirst: ")
                      .bind("EnterFrame", function() {
                        this.attr({ x: 100 -(Crafty.viewport.x), y: 100 });
                      });
      this.healthEl = Crafty.e("2D, DOM, Text")
                .attr({ x: 200 -(Crafty.viewport.x), y: 100 })
                .textFont({family: "Georgia", size: 18})
                .text("Health: ")
                .bind("EnterFrame", function() {
                  this.attr({ x: 200 -(Crafty.viewport.x), y: 100 });
                });

    },
    pushThirst: function(thirstVal) {
      this.thirstEl.text("Thirst: " + thirstVal);

    },
    pushHealth: function(healthVal) {
      this.healthEl.text("Health: " + Math.round(healthVal));
    }
  };
});
