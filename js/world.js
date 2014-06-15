define(['require', 'lodash', 'crafty', './player', './block', './spike'],
 function(require, _, Crafty, player, block, spike) {
  return {
    width: 41,
    height: 79,
    createWorld: function(worldData) {
      Crafty.init(1024, worldData.height);
      Crafty.background('black');
      player.createPlayer(_.extend({ w: this.width, h: this.height }, worldData.start), worldData);
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
