define(['lodash', 'crafty', '../hud'], function(_, Crafty, hud) {
  var defaultThirst = 0,
      defaultHealth = 1000;

  Crafty.c('Vitality', {
    thirst: defaultThirst,
    health: defaultHealth,
    shadedBy: [],

    init: function() {
      this.requires('Collision')
          .bind('EnterFrame', function() {
            if(!this.isShaded()) {
              this.damageBy(1.9);
            }
            this.increaseThirst();
          });
    },

    increaseThirst: function() {
      this.thirst++;
      hud.pushThirst(this.thirst);
      return this;
    },
    damageBy: function(damageAmount) {
      damageAmount = damageAmount || 1;
      this.health -= damageAmount;
      hud.pushHealth(this.health);
      return this;
    },
    isShaded: function() {
      return this.shadedBy.length > 0;
    },
    markAsShaded: function(shadingEntity) {
      if(!_.include(this.shadedBy, shadingEntity)) {
        this.shadedBy.push(shadingEntity);
      }
    },
    markAsUnshaded: function(shadingEntity) {
      this.shadedBy = _.without(this.shadedBy, shadingEntity);
    },
    resetVitality: function() {
      this.thirst = defaultThirst;
      this.health = defaultHealth;
    }
  });

  return {};
});
