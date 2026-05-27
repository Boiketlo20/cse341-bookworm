const express = require('express')
const router = express.Router();

const UserCon = require('../controllers/users')
const validation = require('../middleware/validate-user');

router.get('/user', UserCon.getAll);

router.get('/user/:id', UserCon.getOne);

router.post('/user', validation.saveUser, UserCon.createUser);

router.put('/user/:id', validation.saveUser, UserCon.updateUser);

router.delete('/user/:id', UserCon.deleteUser);

module.exports = router; 