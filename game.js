var inquirer = require('inquirer');
var fs = require('fs');

var argv = process.argv;
var str = argv[3];


var BasicCard = function Basic(front,back) {
    this.front = front;
    this.back = back;

    inquirer.prompt([
      {
        type: "input",
        message: this.front,
        name: "front"
      },
       {
        type: "input",
        message: this.back,
        name: "back"
      }
    ]).then(function(user) {
        console.log(JSON.stringify(user, null, 2));
        fs.appendFile('basic.txt', `${JSON.stringify(user, null, 2)}`, (err) => {
          if (err) throw err;
          console.log('The card information was successfully appended to basic.txt!');
        });
    });
};


var ClozeCard = function Cloze(text,cloze,partial) {
    this.cloze = cloze;
    this.partial = partial;
    this.full = text;
    this.ErrorMessage = function () {
        console.log('Missing "..."');
    }

    inquirer.prompt([
      {
        type: "input",
        message: this.full,
        name: "text"
      },
      {
        type: "input",
        message: this.cloze,
        name: "cloze"
      },
      {
        type: "input",
        message: this.partial,
        name: "partialInput"
      },
    ]).then(function(user) {
        var str = JSON.stringify(user.partialInput, null, 2);
        var subStr = '...';
        var result = str.includes(subStr);

        if(result == true) {
            fs.appendFile('cloze.txt', `${JSON.stringify(user, null, 2)}`, (err) => {
              if (err) throw err;
              console.log('The card information was successfully appended to cloze.txt!');
            });
        } else {
            console.log("Please include the '...' inplace of the cloze word");
        }
    });
}



switch(argv[2]) {
    case "basic":
        var BasicCard = new BasicCard ("What's the question? ","The answer is : ");
        break;
    case "cloze":
        var ClozeCard = new ClozeCard("Enter the full statement", "Enter chosen cloze part: ", "Enter parital phrase: ");
        break;
}