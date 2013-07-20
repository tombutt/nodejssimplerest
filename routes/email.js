/**
 * New node file
 */
var AWS = require('aws-sdk');
AWS.config.loadFromPath('/usr/local/node/nodejssimplerest/creds.json');

exports.sendsqs = function(req, res){
	res.send("this will send an sqs");
};

exports.sendsns = function(req, res){
	res.send("this will send an sns");
	var sns = new AWS.SNS();
	sns.publish({
		"TopicArn":"arn:aws:sns:us-east-1:047247006121:nodeemail",
		"Message":JSON.stringify(req.body)
	}, function(err,data){
		if (err){
			console.log("ERR: "+err);
		}
	});
};

exports.sendnode = function(req, res){
	res.send("this will send email from node directly");
};
