define(['crafty'], function(Crafty) {
  return {
    createText: function() {
      this.thirstEl = Crafty.e("2D, DOM, Text")
                      .attr({ x: 100, y: 100 })
                      .textFont({family: "Georgia", size: 18})
                      .text("Thirst: ");
      this.healthEl = Crafty.e("2D, DOM, Text")
                .attr({ x: 200, y: 100 })
                .textFont({family: "Georgia", size: 18})
                .text("Health: ");

    },
    pushThirst: function(thirstVal) {
      this.thirstEl.text("Thirst: " + thirstVal);
    },
    pushHealth: function(healthVal) {
      this.healthEl.text("Health: " + healthVal);
    }
  };
});
