var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('contacto', {
    style: '/contacto.css',
    isContacto: true
  });
});

module.exports = router;
