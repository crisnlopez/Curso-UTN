var express = require('express');
var router = express.Router();
var usuarioModel = require('./../../models/usuariosModel');

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('admin/login', {
    layout: 'admin/layout.hbs'
  });
});

router.get('/logout', function (req, res, next) {
  req.session.destroy(); // destruye las variables de sesion (id y usuario)
  res.render('admin/login', {
    layout : 'admin/layout'
  });
});


router.post('/', async (req, res, next) => {
  try {
    var usuario = req.body.usuario;
    var password = req.body.password;

    var data = await usuarioModel.getUserByUsernameAndPassword(usuario, password);

    if (data != undefined) {
      req.session.id_usuario = data.id; // columna id de la tabla usuarios
      req.session.nombre = data.usuario; // columna usuario de la tabla usuarios

      res.redirect('/admin/novedades');
    } else {
      res.render('/admin/login', {
        layout: 'admin/layout',
        error: true
      });
    }
  } catch (error) {
    console.error(error);
  }
});

module.exports = router;