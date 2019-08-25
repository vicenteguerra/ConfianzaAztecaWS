let Authcode = require('../../controllers/api/AuthcodeController').Authcode;

module.exports = function (router) {

    router.get('/auth', Authcode.auth);
    router.post('/auth/request', Authcode.createCode);
    router.get('/r/:authcode_id', Authcode.redirectToApp);

    return router;
};
