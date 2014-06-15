define(['lodash', 'crafty', '../hud'], function(_, Crafty, hud) {
  var defaultThirst = 10000,
      defaultHealth = 1000;

  Crafty.c('Vitality', {
    thirst: defaultThirst,
    health: defaultHealth,
    shadedBy: [],

    init: function() {
      this.requires('Collision')
          .bind('EnterFrame', function() {
            if(!this.isShaded()) {
              this.damageBy(1.85);
            }
            this.decreaseThrist();
            if (this.health < 0 || this.thirst < 0) {
              this.reset();
			  Crafty.audio.play("scream");
            }
          });
    },

    decreaseThrist: function() {
      this.thirst-=6;
      hud.pushThirst(this.thirst, defaultThirst);
      return this;
    },
    damageBy: function(damageAmount) {
      damageAmount = damageAmount || 1;
      this.health -= damageAmount;
      hud.pushHealth(this.health, defaultHealth);
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
