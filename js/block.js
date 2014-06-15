define(['lodash', 'crafty'], function(_, Crafty) {
  Crafty.sprite('assets/img/upper_platform_tile.png', { platform_gfx: [0, 0, 400, 25] });
  Crafty.c('Block', {
    init: function() {
      this.requires('2D, DOM, Image, PGrav');
    }
  });

  return {
    createBlock: function(attributes) {
        var createdBlock = Crafty.e('Block')
            .attr({ x: attributes.x, y: attributes.y, w: attributes.w, h: attributes.h })
            .image(attributes.image, 'repeat');
        var collisionAttributes = _.extend({}, attributes, {y: attributes.y + attributes.h, h: 500});
        var impliedCollision = Crafty.e("2D, Collision, Shade")
            .attr(collisionAttributes)
            .collision()
            .onHit("Player", function(target) {
              this.hitboxTarget = target[0].obj;
              if (this.contains(this.hitboxTarget.mbr())) {
                  this.hitboxTarget.markAsShaded(this.getId());
              } else {
                this.hitboxTarget.markAsUnshaded(this.getId());
              }
            },
            function(target) {
              this.hitboxTarget.markAsUnshaded(this.getId());
            });
        return createdBlock;
    }
  };
});
