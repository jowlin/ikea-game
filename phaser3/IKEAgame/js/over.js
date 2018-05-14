//specify a game over state, which changes the background color to magenta. Presssing J gets the player out of that position.
var instruction;
var overState = {
	create: function(){
		game.stage.backgroundColor = '#ff00ff';
		this.keyboard = game.input.keyboard;
		instruction = game.add.text(16, 16, 'Press Z to try again.', { fontSize: '32px', fill: '#FFF' });
		music.destroy();
	},
	update: function(){
			if(this.keyboard.isDown(Phaser.Keyboard.Z)){
			game.state.start('gameLoop');
		}
	}
}

function preload() {
}

function create() {
}

function update() 
{
}
