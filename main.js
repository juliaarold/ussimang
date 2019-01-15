var game; // defineerime muutuja 'game'

game = new Phaser.Game(600, 450, Phaser.AUTO, ''); // defineerime on mänguala suurusega 600*450 pikslit

game.state.add('Menu', Menu); // lisame mängufaasi 'Menu'
game.state.add('Game', Game); // lisame mängufaasi 'Game' 
game.state.add('Game_Over', Game_Over); // lisame mängufaasi 'Game_over'


game.state.start('Menu'); // aktiveerime mängufaasi 'Menu'
