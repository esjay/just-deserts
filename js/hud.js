define(['crafty'], function(Crafty) {
  return {
    createText: function() {
      var offset = this._getViewOffsets();
      this.thirstEl = Crafty.e("2D, DOM, Text")
                      .attr({ x: 100 + offset.x, y: 100 + offset.y })
                      .textFont({family: "Georgia", size: 18})
                      .text("Thirst: ");
      this.healthEl = Crafty.e("2D, DOM, Text")
                .attr({ x: 200 + offset.x, y: 100 + offset.y })
                .textFont({family: "Georgia", size: 18})
                .text("Health: ");

    },
    pushThirst: function(thirstVal) {
      var offset = this._getViewOffsets();
      this.thirstEl.attr({ x: 100 + offset.x, y: 100 + offset.y });
      this.thirstEl.text("Thirst: " + thirstVal);

    },
    pushHealth: function(healthVal) {
      var offset = this._getViewOffsets();
      this.healthEl.attr({ x: 200 + offset.x, y: 100 + offset.y });
      this.healthEl.text("Health: " + healthVal);
    },
    _getViewOffsets: function() {
      return { x: -(Crafty.viewport.x), y: -(Crafty.viewport.y) };
    }
  };
});
