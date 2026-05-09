import nodemailer from "nodemailer"


export const sendEmailService=async({to,subject,text,html})=>{

const transporter = nodemailer.createTransport({

        service: "gmail",
        auth: {
            
            user: process.env.EMAIL ,
            pass: process.env.EMAIL_PASSWORD,
        },
        });

        const nodeMailerMessage= await transporter.sendMail({
            from:process.env.EMAIL,
            to: to,
            subject: subject,
            text: text, // Plain-text version of the message
            html: html, // HTML version of the message
        });
      
}