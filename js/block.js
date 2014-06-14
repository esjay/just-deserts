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
        var impliedCollision = Crafty.e("2D, Collision, WiredHitBox, Shade")
            .attr(collisionAttributes)
            .collision()
            .onHit("Player", function(target) {
              this.hitboxTarget = target[0].obj;
              if (this.contains(this.hitboxTarget.mbr())) {
                  this.hitboxTarget.markAsShaded(target[0].overlap);
              } else {
                this.hitboxTarget.markAsUnshaded();
              }
            },
            function(target) {
              this.hitboxTarget.markAsUnshaded();
            });
        return createdBlock;
    }
  };
});
