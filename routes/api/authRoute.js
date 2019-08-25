let Authcode = require('../../controllers/api/AuthcodeController').Authcode;

module.exports = function (router) {

    router.get('/auth', Authcode.auth);

    return router;
};
