var Menu = {

    preload : function() {
        game.load.image('menu', 'algus.png'); // laeme menüü pildi 'algus.png' (avakuva)
    },

    create: function () {

        this.add.button(0, 0, 'menu', this.startGame, this); // lisame mängule menüü pildi, mida joonistatakse mängu ülevalt vasakust nurgast ja see katab kogu mänguala, ning see toimib nupuna

    },

    startGame: function () {
		
        this.state.start('Game'); // aktiveeritakse mängufaas 'Game'

    }

};