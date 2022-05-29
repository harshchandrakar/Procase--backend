const nodeMailer = require("nodemailer")

exports.sendEmail = async (to,sub,body) => {
    let transportes = nodeMailer.createTransport({
        service:"gmail",
        auth:{
            user:process.env.SENDER_EMAIL,
            pass: process.env.EMAIL_PASS
        }
    });

    let options = {
        from:"ProCase",
        to:to,
        subject:sub,
        text:body
    };
    await transportes.sendMail(options)
};