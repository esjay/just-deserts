define(['lodash', 'crafty'], function(_, Crafty) {
  Crafty.sprite('assets/img/upper_platform_tile.png', { upper_platform: [0, 0, 400, 25] });
  Crafty.sprite('assets/img/ground.png', { ground: [0, 0, 4000, 43] });
  Crafty.sprite('assets/img/lower_platform_tile.png', { lower_platform : [0, 0, 90, 10] });
  Crafty.sprite('assets/img/small_box_1.png', { small_box_1: [0, 0, 90, 175] });
  Crafty.sprite('assets/img/small_box_2.png', { small_box_2: [0, 0, 180, 175] });
  Crafty.sprite('assets/img/large_box_1.png', { large_box: [0, 0, 330, 300] });

  Crafty.c('Block', {
    init: function() {
      this.requires('2D, DOM, PGrav');
    }
  });

  return {
    createBlock: function(attributes) {
        var createdBlock = Crafty.e('Block, ' + attributes.image)
            .attr({ x: attributes.x, y: attributes.y, w: attributes.w, h: attributes.h });
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
