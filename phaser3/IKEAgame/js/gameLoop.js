var responseText1, responseText2, responseText3;
var questionText;
var chats, chatIndex;
var chatStateString = "";
var ready = false;
var errorText = "///";
var webText = "";
var bg;
var phone;
var phonesize = 1;
var beep, music;
//create the variables that need to exist throughout the game. score, various sprites, the game itself.






function createText(){

	var style = { font: 'Pacifico', fontSize: '25px', fill: '#FFF', stroke:'#000', strokeThickness:'5'};
    var styleBig = { font: 'Indie Flower', fontSize: '40px', fill: '#FFF', stroke:'#000', strokeThickness:'3', wordWrap: 'true', wordWrapWidth: '600' };
    var dist1 = 300;
    var dist2 = 45;
    questionText = game.add.text(30, 0, 'questionText', styleBig);
    responseText1 = game.add.text(30, dist1, 'responseText1', style);
    responseText2 = game.add.text(30, dist1+dist2, 'responseText2', style);
    responseText3 = game.add.text(30, dist1+dist2*2, 'responseText3', style);
    chatStateString = "";
    // var html = game.cache.getText('html');
    // var text = html.split('\n');    
    // extraText = game.add.text(30, dist1+dist2*3, 'extraText', style);
    // extraText.text = (text[0]);

    
    ready = true;
}

//graduate strike force
var gameLoopState = {
	create: function(){

		game.time.events.add(Phaser.Timer.SECOND, createText, this);
		//change the background color and specify a keyboard.
		game.stage.backgroundColor = '#facade';
		this.keyboard = game.input.keyboard;
		bg = game.add.sprite(0, 0,'bg1');//game.world.height - 150, 'bg1');
		phone = game.add.sprite(500, 200, 'phone');


		// (most of the code is from phaser tutorials and the 'first game' project.);

		game.physics.startSystem(Phaser.Physics.ARCADE);

		chats = new Array();
	    chats[0] = new chatChoice(game, "", "You are alone in IKEA at night, lights softly glowing. Where do you go first? (R to restart for debugging)", new Array("The Bathroom", "The Kitchen", "The Living Room"), 'bg1');
	    chats[1] = new chatChoice(game, "a", "There is a mirror where your reflection stares back, pastel walls, a lone lipstick by the bath, and a bottle of soda. What to do?", new Array("Take a shower", "Graffiti the bathroom wall with lipstick", "Drink soda and float to the ceiling.. bubbly"),'bg1');
	    chats[2] = new chatChoice(game, "b", "What to do?", new Array("Swing from the chandelier", "Eat some world-famous meatballs", "Pull refrigerator plug"), 'bg2');
	    chats[3] = new chatChoice(game, "c", "Your friends text you and want to peer pressue you. Watch the latest movie or steal a couch?", new Array("Watch movie", "Steal fancy lace couch"), 'bg3');
	    chats[4] = new chatChoice(game, "aa", "You take a cool and cleansing shower with some fruity shampoo and now you feel CLEAN", new Array("end"), 'bg1');
	    chats[5] = new chatChoice(game, "ab", "You draw some fun stuff on the mirror. Wow. What a rebel.", new Array("end"), 'bg1');
	    chats[6] = new chatChoice(game, "ac", "You get in the bath and pop open the soda. After a while, your corporeal form starts to rise. Floaty! Your face ends up pressed to the ceiling. How to get down?", new Array("end"), 'bg1');
	    chats[7] = new chatChoice(game, "ba", "You swang from the chandelier while singing Sia's song. You had fun!", new Array("end"), 'bg2');
	    chats[8] = new chatChoice(game, "bb", "Yum!", new Array("end"), 'bg2');
	    chats[9] = new chatChoice(game, "bc", "You pulled the plug and the fridge is now powerless. You feel powerful.", new Array("end"), 'bg2');
	    chats[10] = new chatChoice(game, "ca", "Wow! What a heartfelt movie. You feel yourself empowered, soul and all.", new Array("end"), 'bg3');
	    chats[11] = new chatChoice(game, "cb", "You stole a couch from IKEA. The cops are waiting outside.", new Array("end"), 'bg3');


	    
	    chatIndex = 0;
	    
	    beep = game.add.audio('beep');
	    music = game.add.audio('music');
	    music.play();
	  
	},
	preload: function() {
	// preload assets
	//initialize the sprites by loading the files, for the spritesheet the resolution must be changed for baddies.\
    game.load.script('webfont', '//ajax.googleapis.com/ajax/libs/webfont/1.4.7/webfont.js');
    game.load.image('bg1', 'assets/img/bg1.jpeg');
	game.load.image('bg2', 'assets/img/bg2.jpeg');
    game.load.image('bg3', 'assets/img/bg3.jpeg');
    //game.load.image('bg3', 'assets/img/bg3.jpg');
    game.load.image('phone', 'assets/img/flipphone2.png');
    
    game.load.audio('beep', 'assets/audio/notification.mp3');
    game.load.audio('music', 'assets/audio/golden_hour.mp3');
    // game.load.text('html', 'http://phaser.io');

	},
	update: function(){
		phone.scale.setTo();
		if(ready){
			if(chatStateString==""){
				
			}
		    if ( game.input.keyboard.justPressed(Phaser.Keyboard.ONE)){
		    	if(responseText1.text!=errorText){
		    		chatStateString+="a";
		    		console.log(chatStateString);
		    		console.log(responseText1.text);
		    		beep.play();
		    	}
		    	
		    	if(responseText1.text == "1) end"){
		    		console.log("end");
		    		game.state.start('over');
		    	}
		    	
		    }
		    if ( game.input.keyboard.justPressed(Phaser.Keyboard.TWO)){
		    	if(responseText2.text!=errorText){
		    		chatStateString+="b";
		    		console.log(chatStateString);
		    		beep.play();
		    	}
		    }
		    if ( game.input.keyboard.justPressed(Phaser.Keyboard.THREE)){
		    	if(responseText3.text!=errorText){
		    		chatStateString+="c";
		    		console.log(chatStateString);
		    		beep.play();
		    	}
		    }

		    if ( game.input.keyboard.justPressed(Phaser.Keyboard.R) ){
		    	chatStateString="";
		    	console.log(chatStateString);
		    }
		    for (var i = 0; i <chats.length; i++) {
		    	if(chatStateString.toUpperCase() == chats[i].stringID.toUpperCase()){
		    		chatIndex = i;
		    	}


		    }
		    bg.loadTexture(chats[chatIndex].bg);

		    var size = chats[chatIndex].ans.length;
		    questionText.text = chats[chatIndex].questionText;
		    
		    if(size>0){
		    	responseText1.text = "1) " + chats[chatIndex].ans[0];
		    }
		    else{
		    	responseText1.text = errorText;
		    }
		    if(size>1){
		    	responseText2.text = "2) " + chats[chatIndex].ans[1];
		    }
		    else{
		    	responseText2.text = errorText;
		    }
		    if(size>2){
		    	responseText3.text = "3) " + chats[chatIndex].ans[2];
		    }
		    else{
		    	responseText3.text = errorText;
		    }
		}
	    
	},
	
}
