var express = require('express');
var router = express.Router();
//Importo il modulo per la gestione del DB
var movieController = require('../controllers/movieController'); 

router.route('/list/:num')
      .get(movieController.list);

router.route('/query/:title')
      .get(movieController.getMovieFromTitle)

router.route('/length_year/:length/:year')
      .get(movieController.getLength_year)

module.exports = router;