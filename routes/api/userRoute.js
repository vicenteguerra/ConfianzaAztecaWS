let User = require('../../controllers/api/UserController').User;

module.exports = function (router) {

    router.get('/user/:id', User.show);
    router.post('/user', User.create);
    router.patch('/user/:id', User.update);
    router.delete('/user', User.destroy);

    return router;
};
