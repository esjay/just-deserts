define(['crafty'], function(Crafty) {

  Crafty.c('ScrollView', {
    viewport: Crafty.viewport,
    oldX: 0,

    init: function() {
      this.requires('2D, Keyboard')
          .bind('EnterFrame', function() {
            if (this.isDown('LEFT_ARROW') && this.viewport.x <= 0 && this.oldX !== this.x) {
              this.viewport.scroll('x', this.viewport.x + Math.abs(this.x - this.oldX));
            } else if(this.isDown('RIGHT_ARROW')) {
              if (400 <= this.x && this.worldData.width > (1024 - this.viewport.x)) {
                this.viewport.scroll('x', this.viewport.x - Math.abs(this.x - this.oldX));
              }
            }
            this.oldX = this.x;
          });
    },

    resetScroll: function() {
      this.viewport.scroll('x', 0);
    }
  });

  return {};
});
