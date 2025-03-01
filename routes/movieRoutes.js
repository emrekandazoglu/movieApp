const express = require('express');
const router = express.Router();
const movieController = require('../controllers/movieController');

router.get('/', movieController.getAllMovies);
router.get('/create', movieController.getCreateMovie);
router.post('/create', movieController.postCreateMovie);
router.get('/edit/:id', movieController.getEditMovie);
router.post('/edit/:id', movieController.postEditMovie);
router.post('/delete/:id', movieController.deleteMovie);

module.exports = router;
