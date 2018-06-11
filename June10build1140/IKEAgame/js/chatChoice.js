// an object for a chat choice. they are usually formatted like
// 1) go to the elevator
// stringID is a unique string for a question. so if a player picks "1) " five times,
// the stringID will be "aaaaa". 1 is a, 2 is b, 3 is c, 4 is d, 5 is d.
chatChoice = function (game, stringID, scale, questionText, ans, bg) {
    this.stringID = stringID;
    this.questionText = questionText;
    this.ans = ans;
    this.bg = bg;
    this.scale = scale;

};

chatChoice.prototype.constructor = chatChoice;