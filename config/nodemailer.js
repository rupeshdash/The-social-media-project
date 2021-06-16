const nodemailer = require('nodemailer');
const ejs = require('ejs');
const env = require('./environment')

let transporter = nodemailer.createTransport(env.smtp);

//relative path is the place where this function is being called
let renderTemplate = (data,relativePath) => {
    let mailHTML;
    ejs.renderFile(
        path.join(__dirname,'../views/mailers',relativePath),
        data,
        function(err,template){
            if(err){console.log("Error in rendering the template"); return;}

            mailHTML = template;
        }
    )

    return mailHTML;
}

module.exports = {
    transporter : transporter,
    renderTemplate : renderTemplate
}