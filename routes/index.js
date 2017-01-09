var express = require('express');
var router = express.Router();
var request = require('request');
var resources = require('../resources/bot-info.json');
var curseData = require('../resources/curse-data.json');

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
	console.log("hit addMember");
  	var mem = new member(name);
  	members[mem.name] = mem;
}

//TESTED: PASSED(mock data)
function isCurse(word,curObj){
	console.log("hit isCurse");
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
	console.log("hit updateCurseObj");
  	if(!(name in members)){
  		addMember(name);
  	}
  	var cur = curse.toLowerCase();
	var ch = members[name].curseHistory;
	if(ch[cur] === undefined){
	  ch[cur] = 1;
	}
	else{
	  ch[cur] += 1;
	}
}

//bot sends message to chat reprimanding user
//and letting them know what bad word they used
function reprimand(user,badWord){
	console.log("hit reprimand");
	return request({
		method: 'POST',
		url: 'https://api.groupme.com/v3/bots/post',
		json:{
				"bot_id": resources.bot_id,
				"text"	: "Hey "+user+"! Watch your language! (bad word: "+badWord+")"
			}
	});
}

//breaks message up by individual words and checks
//each word to see if it is a curse
//TESTED: Mock data
function processMessage(user,message){
	console.log("hit processMessage");
	var wordArr = message.split(" ");
	for(var i=0;i<wordArr.length;i++){
	   if(isCurse(wordArr[i],curseData)){
	    updateCurseObj(user,wordArr[i]);
	    reprimandUser(user,wordArr[i]); 
	   }
	}
}


/* GET home page. */
console.log("up and running!");
router.post('/process_message',function(req,res,next){
	if(req.body.sender_type == "user"){
		console.log(req.body.name);
		console.log(req.body.text);
		process_message(req.body.name,req.body.text);	
	}
})

/*router.post('/process_message', function(req, res, next) {
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
});*/

module.exports = router;
