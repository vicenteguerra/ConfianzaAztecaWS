var express = require('express');
var router = express.Router();
let fs        = require("fs");
let path      = require("path");

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Confianza Azteca' });
});

const BUSINESS_ROUTER_PATH = __dirname + "/api";

fs.readdirSync(BUSINESS_ROUTER_PATH)
    .forEach(function(file) {
      require(path.join(BUSINESS_ROUTER_PATH, file))(router);
    });

module.exports = router;
