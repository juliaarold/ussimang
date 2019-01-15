var Game_Over = {

    preload : function() {

        game.load.image('gameover', 'lopp.png'); // laetakse mängufaasi taustapilt 'lopp.png'
    },

    create : function() {

        // kogu mängualast tekitatakse nupp, millele vajutades alustatakse mängu otsast peale
        this.add.button(0, 0, 'gameover', this.startGame, this);

        // lisatakse viimase tulemuse info
        game.add.text(235, 350, "Tulemus: ", { font: "bold 16px sans-serif", fill: "#2aff2a", align: "center"});
        game.add.text(350, 348, score.toString(), { font: "bold 20px sans-serif", fill: "#ffff00", align: "center" });

    },

    startGame: function () {

        // aktiveeritakse mängufaas 'Game'
        this.state.start('Game');

    }

};