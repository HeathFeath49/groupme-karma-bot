var express = require('express');
var router = express.Router();
var request = require('request');

/* GET home page. */
router.post('/process_message', function(req, res, next) {
	console.log(req.body);
	if(req.body.sender_type == "user"){
		if(req.body.text == "/help"){
			return request({
				method: 'POST',
				url: 'https://api.groupme.com/v3/bots/post',
				json: {
					"bot_id": "821341b4b98c095d00042f97cc",
					"text"	: "What can I help you with?"
				}
			});
		}
	}
});

module.exports = router;
