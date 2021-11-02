var express = require('express');
var router = express.Router();
var nodemailer = require('nodemailer');
var contactoModel = require('../models/contactoModel');

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('contacto', {
    style: '/contacto.css',
    isContacto: true
  });
});

router.post('/', async function (req, res, next) {

  var nombre = req.body.nombre;
  var direccion = req.body.direccion;
  var email = req.body.email;
  var telefono = req.body.telefono;
  var mensaje = req.body.mensaje;

  var obj = {
    to: 'cristianpo@live.com.ar',
    subject: 'Contacto desde la página de ajedrez',
    html: nombre + " se contacto y quiere mas info a este correo: " + email + "<br> Además, hizo el siguiente comentario: " + mensaje + ".<br> Su tel es " + telefono
  } //cierra obj

  var transport = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS
    }
  });

  var info = await transport.sendMail(obj);
  var contacto = await contactoModel.insertContacto(req.body);

  res.render('contacto', {
    style: '/contacto.css',
    isContacto: true,
    message: 'Mensaje enviado correctamente'
  });


}); // cierra post

module.exports = router;