var express = require('express');
var router = express.Router();
var novedadesModel = require('../models/novedadesModel');

// Get home page
router.get('/', async function (req, res, next) {
    var novedades = await novedadesModel.getNovedades();
    res.render('novedades', {
        style: '/novedades.css',
        isNovedades: true,
        novedades
    });
});

module.exports = router;