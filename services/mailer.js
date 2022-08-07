const {EMAIL_SERVER, EMAIL_PORT, EMAIL_USER, EMAIL_PASSWORD, ORGANISATION_NAME} = require('../constants/environment');
const {FAILED, SUCCESS} = require('../constants/global');

const transporter = require('nodemailer').createTransport({
    host: EMAIL_SERVER,
    port: EMAIL_PORT,
    auth: {
        user: EMAIL_USER,
        pass: EMAIL_PASSWORD
    }
});

transporter.verify(function (error, success) {
    if (error) {
      console.log("Mail server not connected");
    } else {
      console.log("Mail Server is ready!");
    }
});


const sendMail = async ({to,subject,text}) => {
    const from = `"${ORGANISATION_NAME}" <${EMAIL_USER}>`;
    try{
        result = await transporter.sendMail({
            from, 
            to,
            subject,
            text,
            html
        });
        return {status: SUCCESS, ...result};
    }catch (e){
        return {status: FAILED}
    }
}

module.exports = {sendMail};




