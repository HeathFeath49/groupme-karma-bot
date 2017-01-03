var express = require('express');
var router = express.Router();
var request = require('request');
var resources = require('../resources/bot-info.json');

//obj of member objects
var members = {};

//regex to check for specific word, case insensitive 
//var re = new RegExp(word,"i");

//class
//TESTED: PASSED
function member(name){
	this.name = name;
	this.curseHistory = {};
}

//helper functions//

//creates new instance of member class and
//adds them to global members object
//TESTED: PASSED 
function addMember(name){
  var mem = new member(name);
  members[mem.name] = mem;
}


// adds/increments members curseHistory object
//TESTED: PASSED  
function updateCurseObj(name,curse){
  var cur = curse.toLowerCase();
	var ch = members[name].curseHistory;
	if(ch[cur] === undefined){
	  console.log("curse not in curse history");
	  ch[cur] = 1;
	}
	else{
	  console.log("curse already in curse history");
	  ch[cur] += 1;
	}
}

//breaks message up by individual words and checks
//each word to see if it is a curse
function processMessage(message){
	var indWords = message.split(" ");
	console.log(indWords);
}


/* GET home page. */
console.log("up and running!");
router.post('/process_message', function(req, res, next) {
	console.log(req.body);
	if(req.body.sender_type == "user"){
		if(req.body.text == "yo"){
			return request({
				method: 'POST',
				url: 'https://api.groupme.com/v3/bots/post',
				json: {
					"bot_id": resources.bot_id,
					"text"	: "What's cooking?"
				}
			}, (err, data) => {
				if(err){
					console.log(err);
				}
			});
		}
	}
});

module.exports = router;
