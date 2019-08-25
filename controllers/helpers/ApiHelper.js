let Models  = require('../../models/index');

let APIHelper = function(){
    this.cleanBody = cleanBody;
};

var cleanBody = function(options){
    var new_body = {}
    for (body_attribute in options.body){
        if(body_attribute in Models[options.model_name].rawAttributes){
            //var db_attribute = Models[options.model_name].rawAttributes[body_attribute];
            new_body[body_attribute] = options.body[body_attribute];
        }
    }
    return new_body;
};


exports.APIHelper = new APIHelper();
