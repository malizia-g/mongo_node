var express = require('express');
var router = express.Router();
//Importo il modulo per la gestione del DB
var movieController = require('../controllers/movieController'); 

router.route('/list/:num')
      .get(movieController.list);

router.route('/movie_from_title/:title')
      .get(movieController.getMovieFromTitle)


module.exports = router;