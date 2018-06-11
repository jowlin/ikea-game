	//  Here is a custom game object called bubble, for the chat bubbles
    bubble = function (game, imageTag, text, x, y) {
	this.x = x;
	this.y = y;
    this.icon = game.add.sprite(this.x, this.y, imageTag);
    this.icon.scale.setTo(0.025);
    this.style1 = { font: "bold 14px Helvetica", fill: "#000" , backgroundColor: "#FFF", wordWrap: "true", wordWrapWidth: "200"};
    

    

    //  The Text is positioned at 0, 100
    this.text = game.add.text(this.x+50, this.y, text, this.style1);
    //this.text.addColor('ffffff', 5);
    this.text.alpha = .8;
    
};

bubble.prototype.constructor = bubble;

bubble.prototype.setParams = function(imageTag, text) {
	this.text.text = text;
	this.icon.loadTexture(imageTag, 0);

    //create different colors for different characters in chat bubbles

    this.style1 = { font: "16px Helvetica", fill: "#fff", wordWrap: "true", wordWrapWidth: "300" , stroke:'#000', strokeThickness:'0', backgroundColor: "#aa0000"};
    if (imageTag == 'mery') {//imageTag.toUpperCase() == 'mery'.toUpperCase) {
        this.style1 = { font: "16px Helvetica", fill: "#fff", wordWrap: "true", wordWrapWidth: "200" , stroke:'#000', strokeThickness:'0', backgroundColor: "#2abac1"};
    }
    else if (imageTag == 'orca') {
        this.style1 = { font: "16px Helvetica", fill: "#fff", wordWrap: "true", wordWrapWidth: "200" , stroke:'#000', strokeThickness:'0', backgroundColor: "#b1db69"};
    } 
    else if (imageTag == 'armen') {
        this.style1 = { font: "16px Helvetica", fill: "#fff", wordWrap: "true", wordWrapWidth: "200" , stroke:'#000', strokeThickness:'0', backgroundColor: "#ffaded"};
    } 
    else if (imageTag == 'liv') {
        this.style1 = { font: "16px Helvetica", fill: "#fff", wordWrap: "true", wordWrapWidth: "200" , stroke:'#000', strokeThickness:'0', backgroundColor: "#ffb049"};
    } 
    else if (imageTag == 'shark') {
        this.style1 = { font: "16px Helvetica", fill: "#fff", wordWrap: "true", wordWrapWidth: "200" , stroke:'#000', strokeThickness:'0', backgroundColor: "#6fced6"};
    } 
    
    else {
        this.style1 = { font: "16px Helvetica", fill: "#fff", wordWrap: "true", wordWrapWidth: "200" , stroke:'#000', strokeThickness:'0', backgroundColor: "#e273a7"};
    }

    this.text.setStyle(this.style1);

};

//copy the parameters of another text bubble.
bubble.prototype.copyParams = function(bubbleIn){
	this.text.text = bubbleIn.text.text;
	this.icon.loadTexture(bubbleIn.icon.key);
    this.style1 = bubbleIn.style1;
    this.text.setStyle(this.style1);
}

//force the bubble's icon and text to adopt the changed location.
bubble.prototype.confirmLoc = function(){
	this.icon.x = this.x;
	this.icon.y = this.y;
	this.text.x = this.x + 50;
	this.text.y = this.y;

}

//remove it from the game.
bubble.prototype.kill = function(){
	this.icon.kill();
	this.text.kill();
}
