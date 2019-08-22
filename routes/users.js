var express = require('express');
var router = express.Router();
//Importo il modulo per la gestione del DB
var userController = require('../controllers/userController'); 

router.route('/list/:email')
  .get(userController.getUserByEmail)
  .put(userController.updateUserBymail)
  .delete(userController.deleteUserByEmail);

router.route('/list')
  .post(userController.createUser);

module.exports = router;