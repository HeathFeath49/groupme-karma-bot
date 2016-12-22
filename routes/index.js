var express = require('express');
var router = express.Router();
var request = require('request');

/* GET home page. */
router.post('/process_message', function(req, res, next) {
  return request({
  	method: 'POST',
  	url: 'https://api.groupme.com/v3/bots/post',
  	json: {
  		"bot_id": "821341b4b98c095d00042f97cc",
  		"text"	: "Hello world"
  	}
  });
});




module.exports = router;
