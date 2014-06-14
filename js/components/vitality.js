define(['crafty'], function(Crafty) {

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
      return this;
    },
    damageBy: function(damageAmount) {
      damageAmount = damageAmount || 1;
      this.health -= damageAmount;
      console.log("health is", this.health);
      return this;
    },
    markAsShaded: function(value) {
      this.shaded = value;
    },
    markAsUnshaded: function() {
      this.shaded = false;
    }
  });

  return {};
});
