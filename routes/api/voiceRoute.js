let Voice = require('../../controllers/api/VoiceController').Voice;

module.exports = function (router) {

    router.post('/voice/verify', Voice.verify);

    return router;
};
