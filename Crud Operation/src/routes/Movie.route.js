const express = require('express');
const router = express.Router();

const movieController = require("../controller/Movie.controller");

router.get('/MovieList', movieController.Movielist);


module.exports = router;