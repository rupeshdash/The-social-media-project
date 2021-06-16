const nodeMailer = require('../config/nodemailer');


//this is another way of exporting a method
exports.newComment = (comment) => {
    console.log("Inside new Comment mailer");
    nodeMailer.transporter.sendMail({
        from : "rupeshkumardash123@gmail.com",
        to: comment.user.email,
        subject:"New Comment published",
        html: '<h1>New comment is published!!!</h1>'
    },(err,info) => {

        if(err){
            console.log("Error in sending email" , err);
        return;
        }
        
        console.log("Message sent",info);
        return;
    }
   
    
    );
}