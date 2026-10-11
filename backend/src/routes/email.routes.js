const express = require('express');
const router = express.Router();
const { enviarCorreoLento } = require('../controllers/email.controller');

router.post('/enviar', enviarCorreoLento);

module.exports = router;