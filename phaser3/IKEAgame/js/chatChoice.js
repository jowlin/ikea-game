	//  Here is a custom game object
chatChoice = function (game, stringID, questionText, ans, bg) {
    this.stringID = stringID;
    this.questionText = questionText;
    this.ans = ans;
    this.bg = bg;

};

chatChoice.prototype.constructor = chatChoice;


// Obj.prototype.update = function() {

//     this.angle += this.rotateSpeed;
//     this.position.add(-3,this.xv);
//     var hitPlatform = game.physics.arcade.collide(this.body, platforms);
//     if(this.position.x<-100 || hitPlatform){
//     	this.kill();
//     }
//     spikes.add(this);
    

// };
