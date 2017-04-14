var inquirer = require('inquirer');
var argv = process.argv;
var str = argv[3];


var BasicCard = function Basic(front,back) {
    this.front = front;
    this.back = back;

    inquirer.prompt([
      {
        type: "input",
        message: this.front,
        name: "name"
      }
    ]).then(function(user) {
        // console.log(JSON.stringify(user, null, 2));
        console.log('The answer is: ' + BasicCard.back);

    });

};


var ClozeCard = function Cloze(text,cloze) {
    this.cloze = cloze;
    this.partial = text.replace(this.cloze, " ... ");
    this.full = text;
    this.ErrorMessage = function () {
        console.log('Missing "..."');
    }
    inquirer.prompt([
      {
        type: "input",
        message: this.partial,
        name: "name"
      }
    ]).then(function(data) {
        // console.log(JSON.stringify(data, null, 2));
        console.log('The answer is: ' + ClozeCard.full);

    });


}
// If the input has "..."
var n = str.search('...');
if(n != -1) {
    console.log(ClozeCard.cloze);
} else {
    this.ErrorMessage();
}




switch(argv[2]) {
    case "basic":
        var BasicCard = new BasicCard ("What's the color of an apple","red");
        break;
    case "cloze":
        var ClozeCard = new ClozeCard("The president of the U.S. is Trump", "Trump");
        break;
}