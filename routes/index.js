var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next){
    res.type('html');
    res.render('verify');
});

module.exports = router;
