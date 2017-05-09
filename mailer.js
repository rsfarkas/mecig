//nodemailer.js

const nodemailer = require('nodemailer');

// create reusable transporter object using the default SMTP transport
let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'roxysfarkas@gmail.com',
        pass: 'majorstudio2'
    }
});


var mailer = {

	sendEmail: function(toField){
		console.log('about to sendEmail, toField:', toField);

		// setup email data with unicode symbols
		let mailOptions = {
		    from: '"me-Cig 👻" <roxysfarkas@gmail.com>', // sender address
		    to: toField, // list of receivers
		    subject: 'Weekly Update', // Subject line
		    // text: 'U still smokin?', // plain text body
		    html: {path: 'http://localhost:3000/email'},
		};

		// send mail with defined transport object
		transporter.sendMail(mailOptions, (error, info) => {
		    if (error) {
		        return console.log(error);
		    } 
		    // return 'Message %s sent: %s', info.messageId, info.response;
		    console.log('Message %s sent: %s', info.messageId, info.response);
		});
	}

}

module.exports = mailer;