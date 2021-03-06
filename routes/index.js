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
	},
	{
		command:/(\/favorite)+ (curse:)([a-zA-Z0-9. _^%&$#?!~@,-]+) /,
		handler: returnFavCurse
	}

<<<<<<< HEAD

var members = {}; //obj of member objects

var botCommands = [
	{
		command:'/say hello',
		handler: function(){
			console.log('hello there');
		}
	}
];

//TESTED: PASSED
function member(name){  
	this.name = name;
	this.curseHistory = {numOfCurses:0};
}

//HELPER FUNCTIONS//
=======
];


/*MAIN*/
router.post('/process_message',function(req,res,next){
	if(req.body.sender_type == "user"){
		processMessage(req,res);	
	}
});


//returns request to post message to group 
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

//breaks message up by individual words and checks
//each word to see if it is a curse
//TESTED: 
function processMessage(req,res){
	console.log("hit processMessage");

	var user = req.body.name;
	var message = req.body.text;
>>>>>>> dev

	commandResolve(req,res,botCommands);
	console.log("passsed command resolve function call");
	//split up words to check for curses
	var wordArr = message.split(" "); 
	for(var i=0;i<wordArr.length;i++){
		//check for curses
		console.log(isCurse(wordArr[i],curseData));
		if(isCurse(wordArr[i],curseData)){
			updateCurseObj(user,wordArr[i]);
	    	reprimandUser(user,wordArr[i]); 
	   	}
	}
}

<<<<<<< HEAD
function sendMessage(msg){
	return request({
		method: 'POST',
		url: 'https://api.groupme.com/v3/bots/post',
		json:{
				"bot_id": resources.bot_id,
				"text"	: msg
			}
	});
}

//TESTED: PASSED(mock data)
=======
//loops through command array and calls handler if command found
//TESTED:PASSED
function commandResolve(req,res,arrOfComms){
	console.log("hit commandResolve");
	for(var c=0;c<arrOfComms.length;c++){
		if(arrOfComms[c].command.test(req.body.text)){
			console.log("command found");
			req.regMatch = arrOfComms[c].command.exec(req.body.text);
			arrOfComms[c].handler(req,res);
		}
	}
}

//TESTED: PASSED
//returns boolean regarding word being curse
>>>>>>> dev
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

//adds/increments members curseHistory object
//TESTED: PASSED 
function updateCurseObj(name,curse){
	//console.log("hit updateCurseObj");
  	var cur = curse.toLowerCase();
	var ch = members[name].curseHistory;
  	if(!(isMember(name))){
  		addMember(name);
  	} 	
	if(ch[cur] === undefined){
	  ch[cur] = 1;
	}
	else{
	  ch[cur] += 1;
	}
<<<<<<< HEAD
	ch.numOfCurses+=1;
=======
	members[name].numOfCurses+=1;
>>>>>>> dev
}

//bot sends message to chat reprimanding user
//and letting them know what bad word they used
//TESTED:PASSED
function reprimandUser(user,badWord){
	console.log("hit reprimand");
	sendMessage("Hey "+user+"! Watch your language! (bad word: "+badWord+")");
<<<<<<< HEAD

	/*return request({
		method: 'POST',
		url: 'https://api.groupme.com/v3/bots/post',
		json:{
				"bot_id": resources.bot_id,
				"text"	: "Hey "+user+"! Watch your language! (bad word: "+badWord+")"
			}
	});*/
}

function commandResolve(message){
}

//breaks message up by individual words and checks
//each word to see if it is a curse
//TESTED: Mock data
function processMessage(user,message){
	console.log("hit processMessage");

	//commandResolve(message);

	//split up words to check for curses
	var wordArr = message.split(" "); 
	for(var i=0;i<wordArr.length;i++){
		//check for curses
		if(isCurse(wordArr[i],curseData)){
			updateCurseObj(user,wordArr[i]);
	    	reprimandUser(user,wordArr[i]); 
	   	}
	}
=======
}


function member(name){
	this.name = name;
	this.curseHistory = {};
	this.numOfCurses = 0;
>>>>>>> dev
}

//creates new instance of member class and
//adds them to global members object
//TESTED: PASSED 
function addMember(name){
	//console.log("hit addMember");
  	var mem = new member(name);
  	members[mem.name] = mem;
}

<<<<<<< HEAD
/* GET home page. */
console.log("up and running!");
router.post('/process_message',function(req,res,next){
	if(req.body.sender_type == "user"){
		processMessage(req.body.name,req.body.text);	
	}
})

=======
//TESTED:
//returns boolean
function isMember(name,membersObj){
	if(name in membersObj){
  		return true;
  	}
  	else{
  		return false;
  	}
}


////////BOT COMMAND FUNCTIONS/////////

function sayHi(req,res){
	sendMessage('Hey there '+req.body.name);
	//console.log(req.regMatch);
}

function returnFavCurse(req,res){
	var desiredUser = req.regMatch[3];
	var ch;
  	var maxWord;
  	var maxNum=0;
	if(isMember(desiredUser)){
		ch = members[name].curseHistory;
	
  		for(var word in n){
    		if(n[word]>maxNum){
      			maxNum = n[word];
      			maxWord = word;
    		}
  		}
  		sendMessage(desiredUser+"'s favorite curse word: "+maxWord);
	}
	else{
		sendMessage(desiredUser+" does not have a curse record.");
	}
}

/////////////////////////////////////

>>>>>>> dev
module.exports = router;
