/******************************************************************************
 *  @Purpose        : Create nodemailer to allow easy email sending . 
 *  @file           : nodemailer.js        
 *  @author         : KAMALAKSHI C SWAMY
 *  @since          : 07-03-2019
 ******************************************************************************/
const nodemailer = require('nodemailer');
/**
* Here we are configuring our SMTP Server details.
* SMTP is mail server which is responsible for sending and recieving email.
*/
exports.sendEMailFunction = url => {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.userName,
            pass: process.env.Password
        },
    });
    const mailOptions = {
        from: process.env.userName,          // sender address
        to: process.env.userName,           // list of receivers
        subject: 'The mail has been received...',    // Subject line
        text: 'The verification link for email is:\n\n' + url
    };
    transporter.sendMail(mailOptions, (err, info) => {
        if (err)
            console.log('error while sending mails-- ', err);
        else
            console.log('result on sending mails-- ', info);
    });
}
