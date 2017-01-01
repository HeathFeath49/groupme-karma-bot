var express = require('express');
var router = express.Router();
var request = require('request');
var resources = require('../resources/bot-info.json');

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
