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
           vue.playerHealth -= damage;
           vue.actions.push({
               actor: ACTORS.monster,
               receiver: ACTORS.player,
               action: ACTIONS.attacks,
               amount: damage
           });
       }
       else if (actionChoice === 1) {
          const damage = specialAttackDamage();
          vue.playerHealth -= damage;
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
           vue.actions.push({
               actor: ACTORS.monster,
               receiver: ACTORS.self,
               action: ACTIONS.heals,
               amount: health
           });
       }
   };

    const isThereAWinner = (vue) => {
        let playerLost = false;
        let monsterLost = false;

        if (vue.playerHealth <= 0) {
           vue.playerHealth = 0;
           playerLost = true;
        }

        if (vue.monsterHealth <= 0) {
           vue.monsterHealth = 0;
           monsterLost = true;
        }

        if (playerLost && monsterLost) {
           alert('Player and Monster both loose!');
           vue.gameStarted = false;
           return false;
        }
        else if (playerLost) {
            alert('Monster wins!');
            vue.gameStarted = false;
            return false;
        }
        else if (monsterLost) {
           alert('Player wins!');
            vue.gameStarted = false;
           return false;
        }
        else {
           return true;
        }
    };

    const getColor = (health) => {
        if (health >= 70) {
           return 'green';
        }
        else if (health >= 40) {
           return 'orange';
        }
        else {
           return 'red';
        }
    };

    return new Vue({
        el: '#app',
        data: {
            playerHealth: 100,
            monsterHealth: 100,
            gameStarted: false,
            actions: []
        },
        methods: {
            startGame() {
                this.gameStarted = true;
                this.playerHealth = 100;
                this.monsterHealth = 100;
                this.actions = [];
            },
            attack() {
               const damage = attackDamage();
               this.monsterHealth -= damage;
               this.actions.push({
                    actor: ACTORS.player,
                    receiver: ACTORS.monster,
                    action: ACTIONS.attacks,
                    amount: damage
                });
               if (isThereAWinner(this)) {
                   monsterAction(this);
               }
            },
            specialAttack() {
               const damage = specialAttackDamage();
               this.monsterHealth -= damage;
               this.actions.push({
                    actor: ACTORS.player,
                    receiver: ACTORS.monster,
                    action: ACTIONS.specialAttacks,
                    amount: damage
                });
               if (isThereAWinner(this)) {
                   monsterAction(this);
               }
            },
            heal() {
               const health = healing();
               this.playerHealth += health;
               this.actions.push({
                   actor: ACTORS.player,
                   receiver: ACTORS.self,
                   action: ACTIONS.heals,
                   amount: health
               });
               if (isThereAWinner(this)) {
                   monsterAction(this);
               }
            },
            giveUp() {
                this.playerHealth = 100;
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
        },
        computed: {
           playerProgress() {
               return {
                  width: (this.playerHealth * 3) + 'px',
                  'background-color': getColor(this.playerHealth)
               }
           },
            monsterProgress() {
                return {
                   width: (this.monsterHealth * 3) + 'px',
                    'background-color': getColor(this.monsterHealth)
                }
            }
        }
    });
})();