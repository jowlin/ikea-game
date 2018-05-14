var game = new Phaser.Game(1000, 600, Phaser.AUTO, '', { preload: preload, create: create, update: update });
//create the variables that need to exist throughout the game. score, various sprites, the game itself.
var instruction;

//  The Google WebFont Loader will look for this object, so create it before loading the script.
WebFontConfig = {

    //  'active' means all requested fonts have finished loading
    //  We set a 1 second delay before calling 'createText'.
    //  For some reason if we don't the browser cannot render the text the first time it's created.
    
    //  The Google Fonts we want to load (specify as many as you like in the array)
    google: {
      families: ['Revalia', 'Pangolin', 'Permanent Marker', 'Pacifico', 'Indie Flower']
    }

};


//specify a mainState (it's not used, it's only there to keep the program running even though there is a duplicate create function.)
var mainState = {
	create: function(){
		game.stage.backgroundColor = '#ff0000';
	}
}

function preload(){
	game.load.image('ikea2', 'assets/img/ikea (2).png');
    game.load.image('phone', 'assets/img/flipphone_back3.png');
    game.load.audio('vibrate', 'assets/audio/textconfirm.mp3');
};

//specify the other game states. specify a keyboard so that key input can be taken.
function create() {
	vibrate = game.add.audio('vibrate');

	game.state.add('gameLoop', gameLoopState);
	game.state.add('over', overState);
	game.state.add('story', storyState);
	game.state.add('main', mainState);
	this.keyboard = game.input.keyboard;
	bg = game.add.sprite(0,-50, 'ikea2');
	bg.scale.setTo(.45,.45);
	bghalf = game.add.sprite((game.width*1.5)+65,-50, 'ikea2');
	bghalf.scale.setTo(.45,.45);
	bghalf.scale.x = bghalf.scale.x * -1;
	phone = game.add.sprite(game.width-300, 20, 'phone')
	phone.scale.setTo(.9,.9);
	instruction = game.add.text(16, 90, 'Press Z to begin.', { fontSize: '32px', fill: '#FFF' });
}

function update() 
{
 //if the  player presses z, start the game.
	if(this.keyboard.isDown(Phaser.Keyboard.Z)){
		game.state.start('story');
	    vibrate.play();
	}

}