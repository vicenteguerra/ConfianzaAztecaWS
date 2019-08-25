let twilio = require('twilio');

let WhatsappHelper = function(){
    this.sendMessage = sendMessage;
};

/*
    var message = {
        body: "TEXT",
        to: "TWILIO_NUMBER",
        mediaUrl: "URL"
    };
 */

let sendMessage = function (message) {
    return new Promise(function (resolve, reject) {
        message.from = process.env.from_twilio_number;
        let client = new twilio(process.env.twilio_account_sid, process.env.twilio_auth_token);
        console.log("TWILIO INPUT")
        console.log(JSON.stringify(message));
        client.messages.create(message).then(function(sent_message){
            sent_message.success = sent_message.error ? false : true;
            return resolve(sent_message)
        });
    });
};


exports.WhatsappHelper = new WhatsappHelper();
