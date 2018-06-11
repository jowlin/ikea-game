//Main Game Loop

//define variables
var responseText1, responseText2, responseText3, responseText4, responseText5;
var questionText;
var debugText;
var notifText;
var chats, chatIndex;
var chatStateString = "";
var ready = false;
var errorText = " ";
var webText = "";
var bg;
var b1;
var phone;
var phonesize = 1;
var beep, music, music_cops, elevator_ding, music_end, ding, phonevibrate;
var bubble1;
var bubbles = new Array();
var doThing = true;
var bubbleLen = 8;
var queue = new Array();
var endingFlags = new Array(5);
var previousMessages = new Array();

var copcar = false;

//********************************
//Press R to restart for debugging
//********************************


//initializes the chatStateString (what question you are on, empty string for first question)
//as well as the endingflags, which are used for the endings determination logic.
//variables style, styleBig, and style1 for different text styles, with fonts sizes etc...
//variables dist1 and dist2 for even spacing purposes.
function createText(){
	for(var i=0; i<5; i++)endingFlags[i]=false;
	var style = { font: 'Pacifico', fontSize: '25px', fill: '#FFF', stroke:'#000', strokeThickness:'5'};
    var styleBig = { font: 'Indie Flower', fontSize: '35px', fill: '#FFF', stroke:'#000', strokeThickness:'5', wordWrap: 'true', wordWrapWidth: '600' };
    var style1 = { font: "Helvetica", fontSize: '14px', fill: "#FFF" , wordWrap: "true", wordWrapWidth: "200" , stroke:'#000', strokeThickness:'3'};
    var dist1 = 300;
    var dist2 = 45;
    questionText = game.add.text(30, 30, 'questionText', styleBig);
    responseText1 = game.add.text(30, dist1, 'responseText1', style);
    responseText2 = game.add.text(30, dist1+dist2, 'responseText2', style);
    responseText3 = game.add.text(30, dist1+dist2*2, 'responseText3', style);
    responseText4 = game.add.text(30, dist1+dist2*3, 'responseText4', style);
    responseText5 = game.add.text(30, dist1+dist2*4, 'responseText5', style);
    debugText = game.add.text(30, 580, 'debugText', style1);
    notifText = game.add.text(649.5, 394, 'notifText', { fontSize: '20px', fill: '#FFF' });
    chatStateString = "";

    
    ready = true;
}

//adds a message by having each text become the text that was created after it,
//to create a scrolling effect. then the newest message is created at the head of the array.
function addMessage(imageTag, text){
	beep.play();
	bubbles[0].y = 500;
	for (var i = bubbleLen-1; i > 0 ; i--) {
		
    	bubbles[i].copyParams(bubbles [i-1]);
    	
	}	
	for(var i=1; i<bubbleLen; i++){
		bubbles[i].y = bubbles[i-1].y-bubbles[i].text.text.length/200 * 200 - 50;
    	bubbles[i].confirmLoc();
	}
	bubbles[0].setParams(imageTag, text);
	
	bubbles[0].confirmLoc();
}

//originally was a timed delay for messages, now it immediately adds a message to the spacebar "queue"
//as long as the message was never played previously. this is to make sure that
//if a player reenters a room, it does not clutter the feed with text messages.
function delayMessage(seconds, imageTag, text){
	for (var i = previousMessages.length - 1; i >= 0; i--) {
		var j = previousMessages[i];

		if(j == text){
			return 1;
		}
	}
	var result = new message(game, imageTag, text);
	previousMessages.push(text);
	queue[queue.length] = result;
}

//sends the next message. activated when the player presses spacebar, or when they switch
//rooms with unread messages. the queue is where the unread messages, so at the end of the 
//function the played message is removed from the queue.
function nextMessage(){
	if(queue.length>0){
		console.log(queue);
		console.log(queue[0].text);
		addMessage(queue[0].image, queue[0].text); //add oldest.
		for(var i=1; i<queue.length; i++){
			queue[i-1].image = queue[i].image;
			queue[i-1].text = queue[i].text;
		}
		queue[queue.length-1] = null;
		queue.length-=1;
	}
}

//the create function of the game loop state.
function gameCreate(){
	game.time.advancedTiming = true;
		//creates the text with a delay so that it doesn't interfere with google font api.
		game.time.events.add(Phaser.Timer.SECOND * 0.1, createText, this);

		//change the background color and specify a keyboard.
		game.stage.backgroundColor = '#facade';
		this.keyboard = game.input.keyboard;
		//initialize the starting background.
		bg = game.add.sprite(0, 0,'ikea-outside');//game.world.height - 150, 'bg1');
		b1 = .42;
		bg.scale.setTo(b1,b1);
		
		//start drawing the phone UI. the transparent white panel and the phone.
		var graphics = game.add.graphics(40,0);

	    // set a fill and line style
	    graphics.beginFill(0xffffff, .5);
	    graphics.lineStyle(10, 0xFF0000, 4);
	    
	    // draw a rectangle for the phone screen
	    graphics.lineStyle(2, 0xffffff, 1);
	    graphics.drawRect(600, 0, 1000, 1000);
	    graphics.endFill();

	    phone = game.add.sprite(615, 400, 'phonefront');
	    notif = game.add.sprite(645, 395, 'notif');
	    notif.scale.setTo(.5,.5);


		//******************************************************************
		//start making chatChoices. These are questions, with an array of answers.
		//chatChoice = function (game, stringID, scale, questionText, ans, bg)
		//each function specifies the game, a room code string, a decimal for background size,
		//a string for the question, and an array of answer strings.
		chats = new Array();
	
		chats[0] = new chatChoice(game, "", .42, "Welcome to IKEA. The sun is setting, and the laws of gravity and time may or may not apply here. Your phone buzzes.", new Array("Enter"), 'ikea-outside');
		chats[1] = new chatChoice(game, "a", .7, "You step inside. There are a lot of people here, too many.", new Array("Take the elevator", "Take the escalator"),'people');
	    chats[2] = new chatChoice(game, "aa", .5, "You feel peer pressure in making the biggest decision of your stay at IKEA: Where to hide?", new Array("Floor 1", "Floor 2", "Top Floor"), 'elevator');
	    chats[3] = new chatChoice(game, "ab", 1.3, "Escalator", new Array("Go up the down", "Nah"), 'escalator');
	    chats[4] = new chatChoice(game, "aba", .21, "Wheeeeeee!", new Array("Return to elevator"), 'escalator-ride');
	    chats[5] = new chatChoice(game, "abb", 1, "Placeholder text", new Array("end"), 'elevator'); //bogey; return to elevator
	    chats[6] = new chatChoice(game, "abaa", 1, "Placeholder text", new Array("end"), 'elevator'); //bogey; return to elevator
	    
	    //places to hide
	    chats[7] = new chatChoice(game, "aaa", .5, "Those beds sure look comfy, but now is not the time for rest.", new Array("hide"), 'beds');
	    chats[8] = new chatChoice(game, "aab", .65, "You've made your way into the storage area.", new Array("Climb up and hide behind boxes"), 'boxes-behind');
	    chats[9] = new chatChoice(game, "aac", .18, "There is no one around, not even a ghost.", new Array("hide"), 'construction-hiding');
	    
	    //after hiding
	    chats[10] = new chatChoice(game, "aaaa", .2, "You climbed up into the rafters. Hehe, everyone looks short from up here. You feel tall.", new Array("resurface"), 'upinrafters'); //should we do resurface vs wait idk minigame what
	    chats[11] = new chatChoice(game, "aaba", .31, "You climbed up the storage area. Wow! Look at the tiny people below.", new Array("resurface"), 'boxes-rafters');
	    chats[12] = new chatChoice(game, "aaca", .2, "You are now so so hidden. Amaze. No one's going to come up here, genius.", new Array("resurface"), 'construction-hiding');

	    //return to elevator
	    chats[13] = new chatChoice(game, "aaaaa", .2, "Placeholder text", new Array("elevator at night"), 'elevator'); 
	    chats[14] = new chatChoice(game, "aabaa", .2, "Placeholder text", new Array("elevator at night"), 'elevator');
	    chats[15] = new chatChoice(game, "aacaa", .2, "Placeholder text", new Array("elevator at night"), 'elevator');

	    //new elevator at night [[6 A's]] = 1
	    chats[16] = new chatChoice(game, "1", .5, "Wow now you're back at the elevator.", new Array("bathroom", "foodcourt", "living room", "bedroom", "storage hallway"), 'elevator');

	    //PLACES & subsequent choices "bathroom", "foodcourt", "living room", "bedroom", "storage hallway"), 'elevator');
	    chats[17] = new chatChoice(game, "1a", .3, "There is a mirror where your reflection stares back. And by the bath, a bath bubbles packet, a lone lipstick, and a bottle of soda. What to do?", new Array("Take a shower", "Graffiti the mirror with lipstick", "Drink soda and float to the ceiling.. bubbly"),'bathroom');
	    chats[18] = new chatChoice(game, "1b", 1.7, "What to do?", new Array("Swing from the chandelier", "Eat some world-famous meatballs", "Pull refrigerator plug", "Devour ice cream"), 'foodcourt');
	    chats[19] = new chatChoice(game, "1c", 1, "Your friends text you and want to peer pressure you. Watch the latest movie or steal a couch?", new Array("Watch movie", "Steal fancy lace couch"), 'tv-living');
	    chats[20] = new chatChoice(game, "1d", .7, "How cozy. Are you up for rest, exercise, or conversation? The stuffies in the corner eye you with gentle curiosity.", new Array("Go to sleep", "Jump on the $1000 bed", "Talk to the stuffies"), 'bedroom');
	    chats[21] = new chatChoice(game, "1e", 1.2, "You have returned to the storage area. To do what?", new Array("Skateboard down the hallway", "Talk to the cat"), 'boxes-hallway');

	    //bedroom choices
	    chats[22] = new chatChoice(game, "1da", .7, "The lights softly glow and your eyelids dim. The stuffies seem to say to you, 'Good night.'", new Array("return"), 'bedroom');
	    chats[23] = new chatChoice(game, "1db", .7, "Bouncy! Even though you feel like the stuffies are watching you, you have a lot of fun.", new Array("return"), 'bedroom');
	    chats[24] = new chatChoice(game, "1dc", 1.7, "You cuddle up next to the stuffies and whisper hello.", new Array("talk to shark", "return"), 'stuffies');
	    chats[25] = new chatChoice(game, "1dca", .2, "You talk to the shark.", new Array("return"), 'stuffyshark');

	    //bathroom choices
	    chats[26] = new chatChoice(game, "1aa", .3, "You take a cool and cleansing shower with some fruity shampoo and now you feel CLEAN", new Array("return"), 'bathroom');
	    chats[27] = new chatChoice(game, "1ab", .3, "You draw some fun stuff on the mirror. Wow. What a rebel.", new Array("return"), 'bathroom');
	    chats[28] = new chatChoice(game, "1ac", .3, "You get in the bath, fill it with bubbles, and pop open the soda. After a while, your corporeal form starts to rise. Floaty! Your face ends up pressed to the ceiling. How to get down?", new Array("return"), 'bathroom');
	    //foodcourt choices
	    chats[29] = new chatChoice(game, "1ba", .2, "You swang from the chandelier while singing Sia's song. You had fun!", new Array("return"), 'table');
	    chats[30] = new chatChoice(game, "1bb", .25, "Yum!", new Array("return"), 'meatballs');
	    chats[31] = new chatChoice(game, "1bc", 1.7, "You pulled the plug and the fridge is now powerless. You feel powerful.", new Array("return"), 'foodcourt');
	    chats[32] = new chatChoice(game, "1bd", .5, "Worth it.", new Array("return"), 'strawberry');
	    
	    //living room choice
	    chats[33] = new chatChoice(game, "1ca", 1, "Wow! What a heartfelt movie. You feel yourself empowered, soul and all.", new Array("return"), 'tv-living');
    	
    	//ending 1 (bad)
    	chats[34] = new chatChoice(game, "1cb", .18, "You stole a couch from IKEA. The cops are waiting outside.", new Array("end"), 'car-and-couch');

	    //other endings (good)
	    chats[35] = new chatChoice(game, "1aaa", .8, "Time to escape! Where to?", new Array("parking lot", "wait first rearrange all the patio chairs onto the lawn"), 'escalator-dark');
	    chats[36] = new chatChoice(game, "1aaaa", 1.6, "You are in the parking lot.", new Array("next"), 'parking-lot');
	    chats[37] = new chatChoice(game, "1aaab", .3, "You escape at dawn, having moved all the white furniture onto the lawn as an act of defiance against the system. Will you get caught?", new Array("end"), 'ikea-outside-with-chairs');
	    chats[38] = new chatChoice(game, "1aaaaa", .33, "You escaped successfully! Lights softly glowing, you feel a sense of peace. You drive home safely.", new Array("end"), 'lights-outside');

		//hallway location
		chats[39] = new chatChoice(game, "1ea", 1.2, "You skateboard down the hallway! Radical! Totally tubular~", new Array("return"), 'boxes-hallway');
	    chats[40] = new chatChoice(game, "1eb", 1.2, "Suddenly, you blank and when you open your eyes, the hallway does not look the same. A small tabby cat blinks up at you.", new Array("talk more to cat", "return"), 'boxes-hallway2');	    
	    chats[41] = new chatChoice(game, "1eba", 1.2, "", new Array("return"), 'boxes-hallway2');

	    chatIndex = 0;
	    
	    //add sounds and play music
	    beep = game.add.audio('beep');
	    ding = game.add.audio('elevator_ding');
	    phonevibrate = game.add.audio('phonevibrate');
	    music = game.add.audio('music');
	    music.loop = true;
	    music.play();
	    if(music_end!=null)music_end.destroy();
	  
	  	for (var i = 0; i < bubbleLen; i++) {
	  		//initialize the bubbles.
	    	bubbles[i] = new bubble(game, '', '', 690, 500-i*40);
    	}
    	phone.scale.setTo(.25);

}

//called when a room is changed. makes sure that the player didn't pick an answer that wasn't
//there, like pressing 5 when there were only three responses. it will also play a message
//if there are unread ones.
function changeRoom(response, letter){
	if(response.text!=errorText){
		chatStateString+=letter;
		console.log(chatStateString);
		console.log(response.text);
		if(queue.length==0)ding.play();
		doThing = true;
	}	
	if(queue.length>0)nextMessage();
}

//the game update loop.
function gameUpdate(){
	debugText.text = "press R to restart " ;//+ chatStateString + " " + queue.length; for debugging
	notifText.text = queue.length;
	//TEMP ENDGAME key - Press E to go to ending
	if ( game.input.keyboard.justPressed(Phaser.Keyboard.E)){
    	chatStateString="1aaa";
    	console.log(chatStateString);
    	console.log("Temp End");
	}	

    if ( game.input.keyboard.justPressed(Phaser.Keyboard.ONE)){
    	changeRoom(responseText1, "a");
    	//if the text of the response is end, then end the game.
    	if(responseText1.text == "1) end"){
    		console.log("end");
    		game.state.start('over');
    	}

    	//if keyword is return, return to elevator
		if(responseText1.text == "1) return"){
	    	console.log("return");
	    	chatStateString="1";
	  	}
    }

    //return is return is choice 2 instead of 1
    if ( game.input.keyboard.justPressed(Phaser.Keyboard.TWO)){
    	if(responseText2.text == "2) return"){
	    	console.log("return");
	    	chatStateString="1";
		}
	}
	//depending on key pressed, change the room using the answer text object and the string to
	//be added to the chatchoice string.
    if ( game.input.keyboard.justPressed(Phaser.Keyboard.TWO)){
    	changeRoom(responseText2,"b");
    }
    if ( game.input.keyboard.justPressed(Phaser.Keyboard.THREE)){
    	changeRoom(responseText3,"c");
    }
    if ( game.input.keyboard.justPressed(Phaser.Keyboard.FOUR)){
    	changeRoom(responseText4,"d");
    }
    if ( game.input.keyboard.justPressed(Phaser.Keyboard.FIVE)){
    	changeRoom(responseText5,"e");
    }
    if ( game.input.keyboard.justPressed(Phaser.Keyboard.SPACEBAR)){
    	if(queue.length>0)
    	nextMessage();
    }

    ////////////////various "redirects" some for shortcut purposes
    //returning to the elevator after escalator
	if ( chatStateString=="abb" || chatStateString=="abaa"){		
    	chatStateString="aa";
    	console.log(chatStateString);
	}	

	//new elevator at night after hiding
	if ( chatStateString=="aaaaa" || chatStateString=="aabaa" || chatStateString=="aacaa"){		
    	chatStateString="1";
    	console.log(chatStateString);
	}

	//if cop car, show cop car on credits screen
	if (chatStateString=="1cb") {
		copcar = true;
		console.log("copcar = true")
	}
	
	//doThing specifies when the player has just done an action. This way the game isn't 
	//running code every single frame, but only in response to a player action.
	if(doThing==true){
		var coun = 0;
		for(var i=0; i<5; i++){
			if(endingFlags[i] == true) coun++;
		}
		if(coun>=4){
			for(var i=0; i<5; i++)endingFlags[i]=false;
			chatStateString="1aaa";
			
		}
		//end game after counter = 5
		
	    for (var i = 0; i <chats.length; i++) {
	    	if(chatStateString.toUpperCase() == chats[i].stringID.toUpperCase()){
	    		chatIndex = i;
	    	}
	    }


	    bg.loadTexture(chats[chatIndex].bg);
   		bg.scale.setTo(chats[chatIndex].scale);

   		var size = chats[chatIndex].ans.length;
	    questionText.text = chats[chatIndex].questionText;
	    
	    var arr = new Array(responseText1, responseText2, responseText3, responseText4, responseText5);

	    for(var i=0; i<5; i++){
	    	if(size>i){
	    		arr[i].text = (i+1) + ") " + chats[chatIndex].ans[i];
	    	}
	    	else{
	    		arr[i].text = errorText;
	    	}
	    }

	}    

	//All the text messages by room

    if(chatStateString == "" && doThing == true){ //intro
    	delayMessage(3,'orca', 'haha Liv, u lost the bet');
    	delayMessage(5,'armen', 'you got to listen to what we say');
    	delayMessage(6,'mery', 'where are you going to hide lol...');
    	delayMessage(9,'liv', 'YOU: ikea is a big place');
    	delayMessage(10,'mery', 'there are too many people here, maybe you should go somewhere with less ppl');
    	doThing = false;
    }
    
    if(chatStateString == "aa" && doThing == true){
    	delayMessage(3,  'mery','i heard the top floor still hasn’t been built yet. as long as nobody decides to work on building it tonight. ');
    	delayMessage(4,  'mery','...you could say you got lost, right?');
    	delayMessage(5, 'orca', 'nah you should climb onto the rafters! That way you can see ppl from above B] ');
    	delayMessage(6, 'orca', 'i heard the second floor is a good place to check out');
    	delayMessage(7, 'mery', 'u are such a bad influence orcy');
    	delayMessage(8, 'orca', 'haha i’d prefer to be called an inspiration ;)');
    	delayMessage(9, 'orca', 'that’s some weird art on the doors btw');
    	delayMessage(10, 'armen', 'people actually post videos of themselves building forts in the second floor');
    	doThing = false;
	}

	if(chatStateString == "ab" && doThing == true){ //escalator
		delayMessage(3,  'orca', 'yoooooooooo');
		delayMessage(5,  'orca', 'you should go up the down escalator');
		delayMessage(7,  'mery', 'that sounds dangerous');
		delayMessage(9,  'armen', 'why not tho');
		doThing = false;
	}

	if(chatStateString == "1a" && doThing == true){ //bathroom
		delayMessage(1, 'mery', 'omg what i would do to have a bath like that');
		delayMessage(4, 'mery', 'u have to try it out');
		delayMessage(5, 'orca', 'pfft that\'s the best you could come up with?');
		delayMessage(6, 'armen', 'lets be resonable here');
		delayMessage(7, 'armen', 'take a shower');
		delayMessage(8, 'mery', 'what');
		delayMessage(9, 'orca', 'lol what are you guys implying about liv');
		delayMessage(10, 'armen', '...nothing');
		doThing = false;
	}

	if(chatStateString == "1b" && doThing == true){ //foodcourt
		delayMessage(1, 'mery', 'i could totally go for some ice cream right now');
		delayMessage(2, 'armen', 'WHAT, if there one thing you eat there it\'s the world famous meatballs');
		delayMessage(4, 'orca', 'pfft who cares about food those chandeliers look fun to climb on');
		doThing = false;
	}

    if(chatStateString == "1c" && doThing == true){ //living room
    	delayMessage(3,'armen', 'that tv looks nice i wonder if it works');
    	delayMessage(5,'mery', 'omg that couch is beautiful. I need it in my life');
    	delayMessage(7,'orca', 'piLLowS');
    	delayMessage(8,'armen', 'mery, liv can’t just steal from ikea for you lol');
    	delayMessage(10,'armen', 'let’s watch a movie');
    	delayMessage(12,'orca', 'i agree, but u should build a pillow fort first! ;)');
    	delayMessage(14,'mery', ' liv.. will u bring me the couch');
    	delayMessage(15,'mery', ' i will love u forever');
    	doThing = false;
    }

    if(chatStateString == "1d" && doThing == true){ //bedroom
    	delayMessage(3, 'mery', 'you should have a nap, we’ve been nagging you so much ya kno');
    	delayMessage(5,'orca', 'noooooo what if u fall asleep lmao');
    	delayMessage(7,'orca', 'woa look at the stuffed animals in the corner. Dope');
    	delayMessage(9,'armen', 'oh man its better than my place');
    	doThing = false;
    }

		if(chatStateString == "1dc" && doThing == true){ //stuffies
    	delayMessage(1, 'liv', 'YOU: h-hello?');
    	delayMessage(5, '', 'BUNNY: i’m ominous as heck');
    	delayMessage(6, '', 'DUCK: bork :)');
    	delayMessage(8, '', 'SANTA: helmp neee'); //liv
    	delayMessage(9, '', 'BUNNY: someone help santa');
    	delayMessage(10, '', 'BUNNY: i think he’s stuck');
    	delayMessage(12, '', 'DUCK: bork :)');
    	delayMessage(13, '', 'ELEPHANT: we’re not that interesting tbh..');
    	delayMessage(15, '', 'ELEPHANT: U should talk to the sharks over there');
    	doThing = false;
    }

    if(chatStateString == "aaaa" && doThing == true){ //rafters 
    	delayMessage(1, 'orca', ' YES im glad u listened to me this looks so cool');
		doThing = false;
    }

    if(chatStateString == "aaba" && doThing == true){ //storage 
    	delayMessage(1, 'orca', 'OMG we’re up so high!');
    	delayMessage(5, 'armen', 'told you this was awesome');
    	delayMessage(8, 'orca', 'fine u right');
    	delayMessage(10, 'orca', ' Hellooooooo tiny people');
    	delayMessage(12, 'mery', 'be careful!!');
    	doThing = false;
	}

	if(chatStateString == "aaca" && doThing == true){ // contruction area
		delayMessage(1, 'mery', 'shhh! they might find u');
		delayMessage(5, 'armen', 'you should silence your phone');
		delayMessage(6, 'orca', 'are you kidding there’s like no one here');
		delayMessage(7, 'mery', 'just making sure idk u never know');
		doThing = false;
	}

	if(chatStateString == "1ba" && doThing == true){// chandelier
		delayMessage(1, 'orca', 'lol yeeeeeeeees');
		delayMessage(2, 'mery', 'omg please be careful');
		delayMessage(4, 'armen', 'i didnt even know they had a chandelier');
		doThing = false;
	}

	if(chatStateString == "1bb" && doThing == true){ //meatballs
		delayMessage(1, 'armen', 'honestly i\'ve actually never had them');
		delayMessage(3, 'mery', 'ugh');
		delayMessage(4, 'orca', 'lol');
		doThing = false;
	}

	if(chatStateString == "1bc" && doThing == true){ //pull plug
		delayMessage(1, 'mery', 'what???');
		delayMessage(2, 'orca', 'bro..');
		delayMessage(3, 'armen', 'dope');
		doThing = false;
	}

	if(chatStateString == "1bd" && doThing == true){ //icecream
		delayMessage(1, 'mery', 'that looks so good');
		delayMessage(2, 'orca', 'you went with vanilla..');
		doThing = false;
	}

    if(chatStateString == "1dca" && doThing == true){ //sharks
    	delayMessage(1,'shark', 'BOB: come here');
    	delayMessage(4,'liv', 'YOU: ?');
    	delayMessage(5,'shark', 'BOB: Son, i have some wisdom to impart to you');
    	delayMessage(7,'shark', 'BOB: Anchors are essential to well-being, but not for sharks');
    	delayMessage(9,'shark', 'BOB: Once i got bonked on the head');
    	delayMessage(10,'shark', 'CYRIL:  lmao');
    	delayMessage(12,'shark', 'JOE: im sad because ppl think sharks are evil ');
    	delayMessage(13,'shark', 'CYRIL: they aren’t wrong');
    	delayMessage(14,'shark', 'BOB: (muffled) elp');
    	delayMessage(16,'liv', 'YOU: so like, how are we actually talking to you');
    	delayMessage(18,'shark', 'BOB: your phone is inundated with ikea magic');
    	delayMessage(20,'shark', 'BOB: and connected to our lingering consciouses');
    	delayMessage(21,'shark', 'CYRIL: hnnnnnngl');
    	delayMessage(23,'liv', 'YOU: ???');
    	delayMessage(24,'shark', 'BOB: a sound of existential confusion');
    	doThing = false;
    }

    if(chatStateString == "1eb" && doThing == true){ //fantastical hallway
    	delayMessage(1,'liv', 'YOU: who are u');
    	delayMessage(5,'cat', 'CAT: to be honest, the ghost of christmas past');
    	delayMessage(7,'liv', 'YOU: how so');
    	delayMessage(9,'cat', 'CAT: … i can float *floats*');
    	delayMessage(10,'liv', 'YOU: wow! ur right');
    	delayMessage(11,'cat', 'CAT:  and the feeling u get from being around me');
    	delayMessage(13,'cat', 'CAT: is the most christmassy feeling but also with a side of loss');
    	delayMessage(15,'cat', 'CAT: that reminds you of your missing younger third cousin');
    	doThing = false;
    }
    	
    if(chatStateString == "1eba" && doThing == true){ //fantastical hallway continued
    	delayMessage(3,'liv', 'YOU: hi again');
    	delayMessage(5,'cat', 'CAT: teens with their video games these days');
    	delayMessage(6,'cat', 'CAT: If i lived in a video game would i be made of crispy pixels?');
    	delayMessage(8,'cat', 'CAT: i mean i certainly hope so');
    	delayMessage(10,'liv', 'YOU: you’d be the crispiest');
    	delayMessage(11,'cat', 'CAT: thank u <3');
    	doThing = false;
    }

    if(chatStateString == "1aaa" && doThing == true){ 
    	delayMessage(3,'mery', 'the store\'s closing!!');
    	delayMessage(5,'armen', 'get out while you still can!');
    	delayMessage(6,'orca', 'yo u know what would be fun?');
    	delayMessage(8,'orca', 'moving all those chairs onto the lawn');
    	doThing = false;
    }

    //ENDINGS (3)
    //car
    if(chatStateString == "1cb" && doThing == true){ 
    	delayMessage(3,'mery', 'AAAAAAAAAAA');
    	delayMessage(5,'orca', 'lmao wild');
    	delayMessage(7,'armen', 'we\'ll bail u out don\'t worry');
    	delayMessage(9,'mery', 'my couch :\'(');
    	doThing = false;
    }
    
    //dawn
    if(chatStateString == "1aaab" && doThing == true){ 
    	delayMessage(3,'mery', 'oh no it\'s dawn!');
    	delayMessage(5,'orca', 'haha u actually listened to me!');
    	delayMessage(6,'orca', 'i love u :)');
    	delayMessage(8,'armen', 'liv you should really get out of there');
    	delayMessage(9,'liv', 'You: OK');
    	doThing = false;
    }

    //success
    if(chatStateString == "1aaaaa" && doThing == true){ 
    	delayMessage(3,'mery', 'are you safe??');
    	delayMessage(5,'liv', 'You: yes');
    	delayMessage(7,'mery', 'oh thank goodness');
    	delayMessage(9,'armen', 'congrats');
    	delayMessage(11,'orca', 'lolol that was rad,, we should do it again sometime');
    	doThing = false;
    }
	
    //sets ending flags based on what room you're in.
	if(chatStateString == "1a") endingFlags[0] = true;
	if(chatStateString == "1b") endingFlags[1] = true;
	if(chatStateString == "1c") endingFlags[2] = true;
	if(chatStateString == "1d") endingFlags[3] = true;
	if(chatStateString == "1e") endingFlags[4] = true;
    
	//restart code. resets all important variables.
    if ( game.input.keyboard.justPressed(Phaser.Keyboard.R) ){
    	chatStateString="";
    	console.log(chatStateString);
    	doThing = true;
    	queue = new Array(0);
    	for(var i=0; i<5; i++)endingFlags[i]=false;
    	for (var i = 0; i < bubbleLen; i++) {
    		bubbles[i].kill();
			bubbles[i] = new bubble(game, '', '', 690, 500-i*40);
		}
		music.restart();
		if(music_cops!=undefined)music_cops.stop();
		if(music_end!=undefined)music_end.stop();
		previousMessages = new Array();
    }
	

}

//the game loop state itself.
var gameLoopState = {
	create: function(){
		gameCreate();
	},

	preload: function() {

	},
	update: function(){
		if(ready)gameUpdate();
	}
}

	//  Here is a custom game object
message = function (game, imageTag, text) {
	this.image = imageTag;
	this.text = text;
};

message.prototype.constructor = message;

//GAMEOVER STATE

//specify a game over state, which changes the background color to magenta. Presssing Z gets the player out of that position.
var instruction;
var overState = {
	create: function(){
		game.stage.backgroundColor = '#aad6cc';
		this.keyboard = game.input.keyboard;
		if(copcar==true){
			bg = game.add.sprite(0, 0,'cop-car');
			bg.scale.setTo(1.2,1.2);
		}
		instruction = game.add.text(7, 5, 'THE END.', { fontSize: '32px', fill: '#FFF' });			
		game.add.text(362, 5, 'Press Z to try again.', { fontSize: '32px', fill: '#FFF' });
		music.destroy();
		music_end = game.add.audio('music_end');
	    music_end.loop = true;
	    music_end.play();
		copcar = false;

		game.add.text(370, 40, 'ikea-outside - Brendan Lynch\npeople - Jacquelin Siegel\nbeds - Ausi TCHEm Lamiw\nescalator - Rayhan Dhuny\nescalator-ride - curtis perry', 	{ fontSize: '12px', fill: '#FFF' });
		game.add.text(370, 140, 'boxes-rafters - Brian Yap\nconstruction-hiding - daniel foster\nupinrafters - daniel foster\nelevator - brian_herzog', 	{ fontSize: '12px', fill: '#FFF' });
	    game.add.text(370, 220, 'boxes-hallway - ikea-2714998_960_720-01.jpeg cc by 0\nboxes-hallway2 - ikea-2714998_960_720-02.jpeg cc by 0\nboxes-behind - William_Selman', 	{ fontSize: '12px', fill: '#FFF' });
	    game.add.text(370, 280, 'couch-living - kirchu - Jenny\nstuffies - daryl mitchell\nstuffyshark - daniel foster\ntv-living - kirchu - Jenny', 	{ fontSize: '12px', fill: '#FFF' });
	    game.add.text(370, 360, 'bedroom - David randomwire\nbathroom - Vox Efx\ntable - daniel foster\nfoodcourt - cc by 0\nmeatballs - lazy_fri13th', 	{ fontSize: '12px', fill: '#FFF' });
	    game.add.text(370, 460, 'strawberry - thomas_hawk_flickr\ncar-and-couch - sarah cady\nikea-outside-with-chairs - Jan miller\nparking-lot - Lewis_Clarke\nlights-outside - brian yap\nescalator-dark - Watchcaddy\ncop-car - scott davidson', 	{ fontSize: '12px', fill: '#FFF' });
		game.add.text(16, 40, 'Art, Writing: Joyce Lin\nAudio, Writing: Alex Bradtke\nProgramming Engine: Roy Cramer\nMusic free from Podington Bear: golden_hour.mp3\nCC by attribution photos from FLICKR - see next column' , 	{ fontSize: '12px', fill: '#FFF' });
		music.stop();
	},
	update: function(){
			if(this.keyboard.isDown(Phaser.Keyboard.Z)){
			game.state.start('gameLoop');
		}
	}
}