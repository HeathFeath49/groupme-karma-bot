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

//TESTED: PASSED
function isCurse(word,curObj){
   for(var l in curObj){
	    for(var i=0;i<curObj[l].length;i++){
	      var regEx = new RegExp(curObj[l][i],"i");
	      if(regEx.test(word)){
	        return true;
	      }
	    }
   }return false;
}

// adds/increments members curseHistory object
//TESTED: PASSED(Mock data) 
function updateCurseObj(name,curse){
  var cur = curse.toLowerCase();
	var ch = members[name].curseHistory;
	if(ch[cur] === undefined){
	  ch[cur] = 1;
	}
	else{
	  ch[cur] += 1;
	}
}

//breaks message up by individual words and checks
//each word to see if it is a curse
//TESTED: Mock data
function processMessage(user,message){
	var wordArr = message.split(" ");
	for(var i=0;i<wordArr.length;i++){
	   if(isCurse(wordArr[i],curseWords)){
	    updateCurseObj(user,wordArr[i]);
	   }
	}
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
			});
		}
	}
});

module.exports = router;
