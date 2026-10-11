const express = require('express');
const { getRoles } = require('../controllers/role.controller');
const { verifyToken, authorizeRoles } = require('../middlewares/auth.middleware');

const router = express.Router();


router.get('/', verifyToken, authorizeRoles('Admin'), getRoles);

module.exports = router;