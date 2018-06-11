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
    game.load.image('phone', 'assets/img/flipphone_Back3.png');
    game.load.audio('vibrate', 'assets/audio/textconfirm.mp3');
    game.load.image('notif', 'assets/img/notif.png');
    game.load.audio('phonevibrate', 'assets/img/phonevibrate.mp3');

    game.load.image('ikea2', 'assets/img/ikea (2).png');
    game.load.image('phonefront', 'assets/img/flipphone_Round.png');
    game.load.image('orca', 'assets/img/orca2.png');
    game.load.image('mery', 'assets/img/mery2.png');
    game.load.image('armen', 'assets/img/armen2.png');
    game.load.image('liv', 'assets/img/liv.png');
    game.load.image('cat', 'assets/img/cat.png');
    game.load.image('shark', 'assets/img/shark.png');


    // preload assets
	//initialize the sprites by loading the files, for the spritesheet the resolution must be changed for baddies.\
    game.load.script('webfont', '//ajax.googleapis.com/ajax/libs/webfont/1.4.7/webfont.js');
    
    //outside pictures
    game.load.image('ikea-outside', 'assets/img/Brendan_Lynch_flickr-01.jpeg'); //sunset
  	
    //before store closing
    game.load.image('people', 'assets/img/Jacquelin_Siegel_flickr-01.jpeg'); //go somewhere with less people
    game.load.image('beds', 'assets/img/Ausi TCHEm Lamiw-02.jpeg'); //bed
    game.load.image('escalator', 'assets/img/Rayhan Dhuny-01.jpeg');
  	game.load.image('escalator-ride', 'assets/img/curtis perry-01.jpeg'); //if you go up the down
  	game.load.image('boxes-rafters', 'assets/img/Brian_Yap_flickr-02.jpeg'); //if you hide behind rafters
  	game.load.image('construction-hiding', 'assets/img/daniel-foster-flickr (2)-01.jpeg'); //hiding in construction
    game.load.image('upinrafters', 'assets/img/daniel-foster-flickr (1)-01.jpeg'); //hiding up in rafters
	
	//PLACES
	game.load.image('elevator', 'assets/img/brian_herzog_flickr-02.jpeg'); //transition between rooms and food court
    
    game.load.image('boxes-hallway', 'assets/img/ikea-2714998_960_720-01.jpeg');
    game.load.image('boxes-hallway2', 'assets/img/ikea-2714998_960_720-02.jpeg');
    game.load.image('boxes-behind', 'assets/img/William_Selman_flickr-01.jpeg');

    game.load.image('couch-living', 'assets/img/kirchu_Jenny_flcirk1-02.jpeg');
    game.load.image('stuffies', 'assets/img/daryl_mitchell flcker-01.jpeg');
	game.load.image('stuffyshark', 'assets/img/daniel-foster-flickr (3)-01.jpeg');
    game.load.image('tv-living', 'assets/img/kirchu_Jenny_flickkr-03.jpeg');

    game.load.image('bedroom', 'assets/img/David_randomwire_flickr-02.jpeg');

    game.load.image('bathroom', 'assets/img/Vox_Efx_flickr-01-02.jpeg');

    game.load.image('table', 'assets/img/daniel-foster-flickr-01.jpeg');
    game.load.image('foodcourt', 'assets/img/foodcourt.jpeg');
    game.load.image('meatballs', 'assets/img/ikea_by_lazy_fri13th_on_flickr-01.jpeg');
    game.load.image('strawberry', 'assets/img/thomas_hawk_flickr.jpg');
    

    //escape/ending
    game.load.image('car-and-couch', 'assets/img/sarah_cady_flickr-01.jpeg'); //you steal the couch
    game.load.image('cop-car', 'assets/img/scott davidson flckr-01-01.jpeg');
    game.load.image('ikea-outside-with-chairs', 'assets/img/Jan_miller_flcikr-01.jpeg'); //you leave at dawn
    game.load.image('parking-lot', 'assets/img/Lewis_Clarke-01.jpeg'); //you just leave i guess
	game.load.image('lights-outside', 'assets/img/brian_yap_flickr2-01.jpeg'); //you escape from the police
	game.load.image('escalator-dark', 'assets/img/Watchcaddy flcker-01.jpeg');

	//art assets
    game.load.image('phone', 'assets/img/flipphone2.png');
    
    game.load.audio('beep', 'assets/audio/notification.mp3');
    game.load.audio('music', 'assets/audio/golden_hour.mp3');

    game.load.audio('music_cops', 'assets/audio/copcredit-pheonton.mp3');
    game.load.audio('elevator_ding', 'assets/audio/ding-tim.kahn.mp3');
    game.load.audio('music_end', 'assets/audio/endcredit-igorgundarev.mp3');

};

//specify the other game states. specify a keyboard so that key input can be taken.
// specify various graphic assets to the starting screen.
function create() {
	vibrate = game.add.audio('vibrate');

	game.state.add('gameLoop', gameLoopState);
	game.state.add('over', overState);
	//game.state.add('story', storyState);
	game.state.add('main', mainState);
	this.keyboard = game.input.keyboard;
	bg = game.add.sprite(0,-50, 'ikea2');
	bg.scale.setTo(.45,.45);
	bghalf = game.add.sprite((game.width*1.5)+65,-50, 'ikea2');
	bghalf.scale.setTo(.45,.45);
	bghalf.scale.x = bghalf.scale.x * -1;
	phone = game.add.sprite(game.width-300, 20, 'phone')
	phone.scale.setTo(.9,.9);
	game.add.text(100, 120, 'Wonders of ', { fontSize: '64px', fill: '#FFF' });
    instruction = game.add.text(16, 500, 'Press number keys to select.\nPress SPACEBAR to read texts.\nPress Z to begin.', { fontSize: '20px', fill: '#FFF' });
}

function update() 
{
 //if the  player presses z, start the game.
	if(this.keyboard.isDown(Phaser.Keyboard.Z)){
		game.state.start('gameLoop');
	    vibrate.play();
	}

}