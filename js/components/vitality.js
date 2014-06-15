define(['crafty', '../hud'], function(Crafty, hud) {

  Crafty.c('Vitality', {
    thirst: 0,
    health: 10000,
    shaded: false,

    init: function() {
      this.requires('Collision')
          .bind('EnterFrame', function() {
            if(!this.shaded) {
              this.damageBy(1);
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
    markAsShaded: function(value) {
      this.shaded = value;
    },
    markAsUnshaded: function() {
      this.shaded = false;
    },
    resetVitality: function() {
      this.thirst = 0;
      this.health = 10000;
    }
  });

  return {};
});
