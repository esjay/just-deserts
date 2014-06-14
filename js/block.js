define(['lodash', 'crafty'], function(_, Crafty) {

  Crafty.c('Block', {
    init: function() {
      this.requires('2D, Canvas, Color, PGrav').color('red');
    }
  });

  return {
    createBlock: function(attributes) {
        var createdBlock = Crafty.e('Block').attr(attributes);
        var collisionAttributes = _.extend({}, attributes, {y: attributes.y + attributes.h, h: 500});
        var impliedCollision = Crafty.e("2D, Collision, WiredHitBox")
            .attr(collisionAttributes)
            .collision()
            .onHit("Player", function(target) {
                console.log("shaded");
            });
        return createdBlock;
    }
  };
});
