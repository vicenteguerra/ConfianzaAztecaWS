let Models  = require('../../models/index');
let APIHelper  = require('../helpers/APIHelper').APIHelper;

let User= function(){
    this.show = show;
    this.create = create;
    this.destroy = destroy;
    this.update = update;
};

let show = function (req, res) {
    try{
        Models.User.findOne({
            paranoid: false,
            where: { user_id: req.params.id}
        }).then(function (user) {
            return res.json({
                success: true,
                resource: user
            });
        });
    }catch(e){
        return res.json({
            success: false,
            message: e.toString()
        });
    }
};

let create = function (req, res, next) {
    try{

        let json = APIHelper.cleanBody({
            body: req.body,
            model_name: "User"
        });

        Models.User.create(json).then(function (user) {
            return res.json({
                success: true,
                resource: user
            });
        }).catch(e => {
            return res.json({
                success: false,
                message: e.toString()
            });
        });
    }catch(e){
        return res.json({
            success: false,
            message: e.toString()
        });
    }
};

let update = function (req, res) {
    try{
        let json = APIHelper.cleanBody({
            body: req.body,
            model_name: "User"
        });

        if(isNaN(req.params.id)){
            return res.json({
                success: false,
                error: "ID NOT FOUND"
            });
        }

        Models.User.findOne({
            where: { user_id: req.params.id }
        }).then(function (user) {
            user.update(json).then(function (user) {
                return res.json({
                    success: true,
                    resource: user
                });
            });
        });
    }catch(e){
        return res.json({
            success: false,
            result: e.toString()
        });
    }
};

let destroy = function (req, res) {
    try{
        Models.User.destroy({
            where: { user_id: req.params.id}
        }).then(function (user) {
            return res.json({
                success: true,
                resource: user
            });
        });
    }catch(e){
        return res.json({
            success: false,
            result: e.toString()
        });
    }
};

exports.User = new User();
