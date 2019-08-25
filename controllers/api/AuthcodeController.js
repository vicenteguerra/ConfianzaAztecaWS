
let Authcode = function(){
    this.auth = auth;
};

let auth = function (req, res) {
    try{
        return res.json({
            success: true,
            resource: {

            }
        });
    }catch(e){
        return res.json({
            success: false,
            message: e.toString()
        });
    }
};

exports.Authcode = new Authcode();
