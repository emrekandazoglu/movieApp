const { Movie, Genre, Actor } = require('../models/index.js');

async function seedDatabase() {
	try {
		// Örnek türler
		const genres = await Genre.bulkCreate([
			{ name: 'Aksiyon' },
			{ name: 'Komedi' },
			{ name: 'Drama' },
			{ name: 'Bilim Kurgu' },
			{ name: 'Macera' },
		]);

		// Örnek aktörler
		const actors = await Actor.bulkCreate([
			{ name: 'Tom Hanks', birth_year: 1956 },
			{ name: 'Leonardo DiCaprio', birth_year: 1974 },
			{ name: 'Scarlett Johansson', birth_year: 1984 },
			{ name: 'Morgan Freeman', birth_year: 1937 },
			{ name: 'Emma Stone', birth_year: 1988 },
		]);

		// Örnek filmler
		const movies = await Movie.bulkCreate([
			{ title: 'Inception', release_year: 2010, duration: 148 },
			{ title: 'The Shawshank Redemption', release_year: 1994, duration: 142 },
			{ title: 'La La Land', release_year: 2016, duration: 128 },
			{ title: 'The Dark Knight', release_year: 2008, duration: 152 },
			{ title: 'Forrest Gump', release_year: 1994, duration: 142 },
		]);

		// İlişkileri kur
		await movies[0].addActors([actors[1], actors[2]]);
		await movies[0].addGenres([genres[0], genres[3]]);

		await movies[1].addActors([actors[3]]);
		await movies[1].addGenres([genres[2]]);

		await movies[2].addActors([actors[4]]);
		await movies[2].addGenres([genres[2]]);

		await movies[3].addGenres([genres[0], genres[2]]);

		await movies[4].addActors([actors[0]]);
		await movies[4].addGenres([genres[2], genres[4]]);

		console.log('Örnek veriler başarıyla eklendi.');
	} catch (error) {
		console.error('Veri eklenirken hata oluştu:', error);
	}
}

// export default yerine module.exports kullan
module.exports = seedDatabase;
