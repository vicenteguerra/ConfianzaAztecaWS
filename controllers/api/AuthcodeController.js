let Models  = require('../../models/index');
let WhatsappHelper = require('../helpers/WhatsappHelper').WhatsappHelper;

let Authcode = function(){
    this.auth = auth;
    this.createCode = createCode;
    this.redirectToApp = redirectToApp;
};

let redirectToApp = async function(req, res){
    try{
        let authcode = await Models.Authcode.findOne({
            where: {
                authcode_id: req.params.authcode_id
            }
        });

        if(!authcode){
            res.redirect(process.env.my_host + "/404");
        }

        let link = `confianzaazteca://confianza.botlers.io/?validation=${authcode.get("auth_type")}&id=${authcode.get("authcode_id")}`;
        console.log(link);
        res.redirect(link);

    }catch(e){
        return res.json({
            success: false,
            message: e.toString()
        });
    }
};

let createCode = async function(req, res){
    try{
        let user_id = req.body.user_id;
        let auth_type = req.body.auth_type ? req.body.auth_type : 1;
        let user = await Models.User.findOne({
            where: {
                user_id: user_id
            }
        });
        if(!user){
            return res.json({
                success: false,
                message: "User not found"
            });
        }

        let to_twilio_number = "whatsapp:" + user.get("whatsapp_number");

        let code = await Models.Authcode.create({
            user_id: user_id,
            auth_type: auth_type
        });

        let url = process.env.my_host + "/r/" + code.get("authcode_id");
        let message = {
            body: `Hola, por favor ayúdanos a validar tu identidad \n ${url}`,
            to: to_twilio_number
        };
        console.log(message);
        WhatsappHelper.sendMessage(message)
        return res.json({
            success: true,
        });
    }catch(e){
        return res.json({
            success: false,
            message: e.toString()
        });
    }
};

let auth = function (req, res) {
    try{
        console.log(req.body);
        return res.json({
            success: true
        });
    }catch(e){
        return res.json({
            success: false,
            message: e.toString()
        });
    }
};

exports.Authcode = new Authcode();
