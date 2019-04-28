new Vue({
    el: '#app',
    data: {
        playerHealth: 100,
        monsterHealth: 100,
        gameIsRunnig: false,
        turns: [],
    },
    methods: {
        stateGame: function (stateResponse) {
            this.gameIsRunnig = stateResponse
            this.playerHealth = 100
            this.monsterHealth = 100
            this.turns = []
        },
        attack: function () {
            damage = this.getRandomIntInclusive(1, 11);
            this.monsterHealth -= damage;
            this.turns.unshift({
                isPlayer: true,
                text: 'Le joueur a attaqué de : ' + damage
            });
            this.checkWin()
            damage2 = this.getRandomIntInclusive(3, 15);
            this.playerHealth -= damage2
            this.turns.unshift({
                isPlayer: false,
                text: 'Le monstre a attaqué de : ' + damage2
            })
            this.checkWin()

        },
        specialAttack: function () {
            damage = this.getRandomIntInclusive(13, 22);
            this.monsterHealth -= damage;
            this.turns.unshift({
                isPlayer: true,
                text: 'Le joueur a fait une attaque speciale de : ' + damage
            })
            this.checkWin()
            damage2 = this.getRandomIntInclusive(15, 26);
            this.playerHealth -= damage2
            this.turns.unshift({
                isPlayer: false,
                text: 'Le monstre a fait une attaque speciale de : ' + damage2
            })
            this.checkWin()
        },
        heal: function () {
            heal = 10
            if (this.playerHealth >= 90) {
                this.playerHealth = 100
                this.turns.unshift({
                    isPlayer: true,
                    text: 'Le joueur s\'est soigné au maximum'
                });
            } else {
                this.playerHealth += heal
                this.turns.unshift({
                    isPlayer: true,
                    text: 'Le joueur s\'est soigné de : ' + heal
                });
            }
            damage2 = this.getRandomIntInclusive(3, 15);
            this.playerHealth -= damage2
            this.turns.unshift({
                isPlayer: false,
                text: 'Le monstre a attaqué de : ' + damage2
            })
            this.checkWin()

        },
        getRandomIntInclusive: function (min, max) {
            min = Math.ceil(min)
            max = Math.floor(max)
            return Math.floor(Math.random() * (max - min + 1)) + min
        },
        checkWin: function () {
            if (this.monsterHealth <= 0) {
                this.monsterHealth = 0
                this.resultsToNewGame('Gagné !')
            } else if (this.playerHealth <= 0) {
                this.playerHealth = 0
                this.resultsToNewGame('Perdu..')
            }
        },
        giveUp: function () {

            if (confirm("Voulez vous vraiment quitter ?")) {
                this.playerHealth = 0
                this.monsterHealth = 100
                this.resultsToNewGame('Perdu, abandon..')
            }
        },
        resultsToNewGame: function (message) {
            response = confirm(message + " Voulez vous faire une nouvelle partie ?")
            if (response) {
                this.stateGame(true)
            } else {
                this.stateGame(false)
            }
        }
    }
})