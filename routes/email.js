/**
 * New node file
 */
var AWS = require('aws-sdk');
AWS.config.loadFromPath('/usr/local/node/nodejssimplerest/creds.json');

exports.sendses = function(req,res){
	var ses = new AWS.SES();
	ses.sendEmail({
//JSON PARAMS
	"Source":"info@cheekyware.com",
	"Destination":{"ToAddresses":["info@cheekyware.com"]
		},
	"Message":{"Subject":{"Data":"SES"},
	"Body":{"Text":{"Data":JSON.stringify(req.body)}}
		}
	}, function(err,data){
		if (err){
			console.log("ERR: "+err);
			res.send("Unable to send email, sorry for the inconvenience");
		} else {
			console.log(req.body);
			res.redirect(302, req.body.redirect);
		}
	});
}
exports.sendsqs = function(req, res){
	res.send("this will send an sqs");
};

exports.sendsns = function(req, res){
	console.log("in SNS");
	var sns = new AWS.SNS();
	sns.publish({
		"TopicArn":"arn:aws:sns:us-east-1:047247006121:nodeemail",
		"Subject":req.body.subject,
		"Message":"From:"+req.body.email+"Body:"+req.body.body
	}, function(err,data){
		if (err){
			console.log("ERR: "+err);
			res.send("Unable to send email, sorry for the inconvenience");
		} else {
			console.log(req.body);
			res.redirect(302, req.body.redirect);
		}
	});
};

exports.sendnode = function(req, res){
	res.send("this will send email from node directly");
};
