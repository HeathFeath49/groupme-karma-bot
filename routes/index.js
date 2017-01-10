var express = require('express');
var router = express.Router();
var request = require('request');
var botData = require('../resources/bot-info.json');
var curseData = require('../resources/curse-data.json');


var members = {}; //obj of member objects

var botCommands = [
	{
		command:/(\/say)+ (hi)/,
		handler: sayHi
	}
];

//TESTED: PASSED
function member(name){  
	this.name = name;
	this.curseHistory = {numOfCurses:0};
}

//HELPER FUNCTIONS//

//creates new instance of member class and
//adds them to global members object
//TESTED: PASSED 
function addMember(name){
	console.log("hit addMember");
  	var mem = new member(name);
  	members[mem.name] = mem;
}

//TESTED:PASSED
function sendMessage(msg){
	return request({
		method: 'POST',
		url: 'https://api.groupme.com/v3/bots/post',
		json:{
				"bot_id": botData.bot_id,
				"text"	: msg
			}
	});
}

function sayHi(){
	sendMessage('hi there');
}

//TESTED: PASSED
function isCurse(word,curObj){
	//console.log("hit isCurse");
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
//TESTED: PASSED 
function updateCurseObj(name,curse){
	//console.log("hit updateCurseObj");
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
	ch.numOfCurses+=1;
}

//bot sends message to chat reprimanding user
//and letting them know what bad word they used
//TESTED:PASSED
function reprimandUser(user,badWord){
	console.log("hit reprimand");
	sendMessage("Hey "+user+"! Watch your language! (bad word: "+badWord+")");
}


function commandResolve(req,res,arrOfComms){
	console.log("hit commandResolve");
	for(var c=0;c<arrOfComms;c++){
		if(arrOfComms[i].command.test(req.body.text)){
			console.log("command found");
			arrOfComms[i].handler(req,res);
		}
	}
}


//breaks message up by individual words and checks
//each word to see if it is a curse
//TESTED: 
function processMessage(req,res){
	console.log("hit processMessage");

	var user = req.body.name;
	var message = req.body.text;

	commandResolve(req,res,botCommands);

	//split up words to check for curses
	var wordArr = message.split(" "); 
	for(var i=0;i<wordArr.length;i++){
		//check for curses
		if(isCurse(wordArr[i],curseData)){
			updateCurseObj(user,wordArr[i]);
	    	reprimandUser(user,wordArr[i]); 
	   	}
	}
}


/*MAIN*/
router.post('/process_message',function(req,res,next){
	if(req.body.sender_type == "user"){
		processMessage(req,res);	
	}
})

module.exports = router;
