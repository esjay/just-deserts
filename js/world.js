define(['require', 'lodash', 'crafty', './player', './block', './spike'],
 function(require, _, Crafty, player, block, spike) {
  return {
    width: 41,
    height: 79,
    createWorld: function(worldData) {
      Crafty.init(1024, worldData.height);
      Crafty.background('url(assets/img/background.png)');
      player.createPlayer(_.extend({ w: this.width, h: this.height }, worldData.start), worldData);
      _(worldData.platforms).each(function(attributes) {
        var collisionAttributes = _.extend({}, attributes, {y: attributes.y + attributes.h, h: 500});
        Crafty.e('2D, Canvas, Color, Tint').attr(collisionAttributes).tint("#808080", 0.5);
      });
      _(worldData.platforms).each(function(platform) {
        block.createBlock(platform);
      });
      _(worldData.spikes).each(function(sp) {
        spike.createSpike(sp);
      });

      Crafty.e('EndArea, Collision').attr(worldData.end);

      return worldData;
    }
  };
});
