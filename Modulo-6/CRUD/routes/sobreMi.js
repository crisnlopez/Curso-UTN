var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('sobreMi', {
    style: '/sobreMi.css',
    isSobreMi: true
  });
});

module.exports = router;
