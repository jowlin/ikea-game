//specify a backstory state
var instruction;
var counter = 0;
var storyState = {
	preload: function() {
		game.load.image('ikea2', 'assets/img/ikea (2).png');
    	game.load.image('phonefront', 'assets/img/flipphone_Round.png');
    	game.load.image('orca', 'assets/img/orca.png');
    	game.load.image('mery', 'assets/img/mery.png');
    	game.load.image('armen', 'assets/img/armen.png');
	},
	create: function(){
		this.keyboard = game.input.keyboard;
		bg = game.add.sprite(0,-50, 'ikea2');
		bg.scale.setTo(.45,.45);
		bghalf = game.add.sprite((game.width*1.5)+65,-50, 'ikea2');
		bghalf.scale.setTo(.45,.45);
		bghalf.scale.x = bghalf.scale.x * -1;
		phone = game.add.sprite(game.width-300, 20, 'phonefront')
		phone.scale.setTo(.9,.9);
		orca = game.add.sprite(20, 20, 'orca')
		orca.scale.setTo(.22,.22);
		mery = game.add.sprite(20, 170, 'mery')
		mery.scale.setTo(.3,.3);
		armen = game.add.sprite(20, 300, 'armen')
		armen.scale.setTo(.27,.27);
		instruction = game.add.text(390, 120, 'Press Z to continue.', { fontSize: '32px', fill: '#FFF' });
		instruction = game.add.text(140, 120, '13 mins ago\nMery: liv! where are you now?\nKendrick: At a diner\nOrca: WOW look at all food!\nOrca: you\'ve GOT to try their meatballs!\nKendrick: (Picture of food)\nMery: Why would you try meatballs??\nOrca: they\'re WORLD FAMOUS!!\nMery: Oooh\nKendrick: I say pull the plug\nOrca: what?\nMery: WHAT\nKendrick: I mean shut off the freezer\nMery: ?????\nKendrick: It will be hilarious\nMery: And let all the food spoil?\nOrca: haha i have a better idea\nOrca: you should swing from the chandelier!\nMery: …\nkendrick: …', {fontSize: '14px', fill: '#000' });
	},
	update: function(){
		if(this.keyboard.justPressed(Phaser.Keyboard.Z) && counter==2){
			game.state.start('gameLoop');
		}
		if(this.keyboard.justPressed(Phaser.Keyboard.Z)){
			instruction.destroy();
			counter=2;
			instruction = game.add.text(140, 120, '5 mins ago\nMery: that sounds dangerous\nKendrick: My idea is totally better\nOrca: i\'m going to side with mery for once, why waste all that food?\nOrca: as a food lover u both scare and insult me\nMery: ahaha\nKendrick: This is mutiny\nMery: ahem\nMery: i am the princess\nKendrick: o really <meme>\nOrca: u memester\nORCA: liv listen to me these meatballs are the best u wont regretti\nMery: They do sound worth a try if they\'re world famous\nMery: @ORCA why is your name capitalized now?\nORCA: doesn\’t matter\nORCA: @liv, make a choice\n', { fontSize: '14px', fill: '#000' });

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
