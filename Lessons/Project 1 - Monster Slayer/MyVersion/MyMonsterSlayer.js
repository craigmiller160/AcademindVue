(() => {
   const ACTORS = {
      player: 'PLAYER',
      monster: 'MONSTER',
      self: 'SELF'
   };

   const ACTIONS = {
      attacks: 'ATTACKS',
      specialAttacks: 'SPECIAL ATTACKS',
      heals: 'HEALS'
   };

   const attackDamage = () => Math.floor(Math.random() * 10);
   const specialAttackDamage = () => Math.floor(Math.random() * 10) + 5;
   const healing = () => Math.floor(Math.random() * 10);

   const monsterAction = (vue) => {
       const actionChoice = Math.floor(Math.random() * 3);
       if (actionChoice === 0) {
           const damage = attackDamage();
           vue.youHealth -= damage;
           // vue.actions.push(`MONSTER ATTACKS PLAYER FOR ${damage}`);
           vue.actions.push({
               actor: ACTORS.monster,
               receiver: ACTORS.player,
               action: ACTIONS.attacks,
               amount: damage
           });
       }
       else if (actionChoice === 1) {
          const damage = specialAttackDamage();
          vue.youHealth -= damage;
          // vue.actions.push(`MONSTER SPECIAL ATTACKS PLAYER FOR ${damage}`);
           vue.actions.push({
               actor: ACTORS.monster,
               receiver: ACTORS.player,
               action: ACTIONS.specialAttacks,
               amount: damage
           });
       }
       else {
          const health = healing();
          vue.monsterHealth += health;
          // vue.actions.push(`MONSTER HEALS FOR ${health}`);
           vue.actions.push({
               actor: ACTORS.monster,
               receiver: ACTORS.self,
               action: ACTIONS.heals,
               amount: health
           })
       }
   };

    return new Vue({
        el: '#app',
        data: {
            youHealth: 100,
            monsterHealth: 100,
            gameStarted: false,
            actions: []
        },
        methods: {
            startGame() {
                this.gameStarted = true;
            },
            attack() {
               monsterAction(this);
               const damage = attackDamage();
               this.monsterHealth -= damage;
               // this.actions.push(`PLAYER ATTACKS MONSTER FOR ${damage}`);
               this.actions.push({
                    actor: ACTORS.player,
                    receiver: ACTORS.monster,
                    action: ACTIONS.attacks,
                    amount: damage
                })
            },
            specialAttack() {
               monsterAction(this);
               const damage = specialAttackDamage();
               this.monsterHealth -= damage;
               // this.actions.push(`PLAYER SPECIAL ATTACKS MONSTER FOR ${damage}`);
               this.actions.push({
                    actor: ACTORS.player,
                    receiver: ACTORS.monster,
                    action: ACTIONS.specialAttacks,
                    amount: damage
                })
            },
            heal() {
               monsterAction(this);
               const health = healing();
               this.youHealth += health;
               // this.actions.push(`PLAYER HEALS FOR ${health}`);
               this.actions.push({
                   actor: ACTORS.player,
                   receiver: ACTORS.self,
                   action: ACTIONS.heals,
                   amount: health
               })
            },
            giveUp() {
                this.youHealth = 100;
                this.monsterHealth = 100;
                this.actions = [];
                this.gameStarted = false;
            },
            getActionClass(action) {
               if (action.actor === ACTORS.player) {
                  return 'player-action';
               }
               else {
                  return 'monster-action';
               }
            }
        }
    });
})();