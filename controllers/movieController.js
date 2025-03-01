const { Movie, Genre, Actor } = require('../models/index.js');

exports.getAllMovies = async (req, res) => {
	try {
		const movies = await Movie.findAll({
			include: [Genre, Actor],
		});
		res.render('movies/index', { movies });
	} catch (error) {
		console.error(error);
		res.status(500).send('Bir hata oluştu');
	}
};

exports.getCreateMovie = async (req, res) => {
	try {
		const genres = await Genre.findAll();
		const actors = await Actor.findAll();
		res.render('movies/create', { genres, actors });
	} catch (error) {
		console.error(error);
		res.status(500).send('Bir hata oluştu');
	}
};

exports.postCreateMovie = async (req, res) => {
	try {
		const { title, release_year, duration, genreIds, actorIds } = req.body;

		// Film oluştur
		const movie = await Movie.create({
			title,
			release_year,
			duration,
		});

		// Türleri ekle (array olarak gelmesini sağla)
		if (genreIds) {
			const genreIdsArray = Array.isArray(genreIds) ? genreIds : [genreIds];
			await movie.setGenres(genreIdsArray);
		}

		// Oyuncuları ekle (array olarak gelmesini sağla)
		if (actorIds) {
			const actorIdsArray = Array.isArray(actorIds) ? actorIds : [actorIds];
			await movie.setActors(actorIdsArray);
		}

		res.redirect('/movies');
	} catch (error) {
		console.error(error);
		res.status(500).send('Bir hata oluştu');
	}
};

exports.getEditMovie = async (req, res) => {
	try {
		const movie = await Movie.findByPk(req.params.id, {
			include: [Genre, Actor],
		});
		const genres = await Genre.findAll();
		const actors = await Actor.findAll();
		res.render('movies/edit', { movie, genres, actors });
	} catch (error) {
		console.error(error);
		res.status(500).send('Bir hata oluştu');
	}
};

exports.postEditMovie = async (req, res) => {
	try {
		const { title, release_year, duration, genreIds, actorIds } = req.body;
		const movie = await Movie.findByPk(req.params.id);

		await movie.update({ title, release_year, duration });
		await movie.setGenres(genreIds || []);
		await movie.setActors(actorIds || []);

		res.redirect('/movies');
	} catch (error) {
		console.error(error);
		res.status(500).send('Bir hata oluştu');
	}
};

exports.deleteMovie = async (req, res) => {
	try {
		await Movie.destroy({
			where: { id: req.params.id },
		});
		res.redirect('/movies');
	} catch (error) {
		console.error(error);
		res.status(500).send('Bir hata oluştu');
	}
};
