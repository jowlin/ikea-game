	//  Here is a custom game object
chatChoice = function (game, stringID, scale, questionText, ans, bg) {
    this.stringID = stringID;
    this.questionText = questionText;
    this.ans = ans;
    this.bg = bg;
    this.scale = scale;

};

chatChoice.prototype.constructor = chatChoice;