// Generated by LiveScript 1.2.0
(function(){
  this.__emailer__ = null;
  this.include = function(){
    var emailer, nodemailer, generator, smtpTransport;
    if (this.__emailer__) {
      return this.__emailer__;
    }
    emailer = {};
    emailer.log = function(){
      return console.log("email tester");
    };
    nodemailer = require('nodemailer');
    generator = require('xoauth2').createXOAuth2Generator({
      user: process.env.gmail_user,
      clientId: process.env.gmail_clientId,
      clientSecret: process.env.gmail_clientSecret,
      refreshToken: process.env.gmail_refreshToken
    });
    generator.on('token', function(token){});
    smtpTransport = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        xoauth2: generator
      }
    });
    emailer.sendemail_ignore = function(emailTo, emailSubject, emailBody, callback){
      return callback(" [E-mail Sent]");
    };
    emailer.sendemail = function(emailTo, emailSubject, emailBody, callback){
      var mailOptions;
      mailOptions = {
        from: process.env.gmail_user,
        to: emailTo,
        subject: emailSubject,
        text: emailBody,
        html: emailBody
      };
      smtpTransport.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error);
          console.dir(info);
          callback(" EMAIL ERROR - " + error);
        } else {
          callback(" [E-mail Sent]");
          return info.accepted;
        }
        smtpTransport.close();
      });
    };
    return this.__emailer__ = emailer;
  };
}).call(this);
