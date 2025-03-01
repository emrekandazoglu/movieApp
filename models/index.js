const Movie = require('./movie');
const Actor = require('./actor');
const Genre = require('./genre');

// İlişkileri tanımla
Movie.belongsToMany(Actor, {
	through: 'movies_actors',
	timestamps: true,
});
Actor.belongsToMany(Movie, {
	through: 'movies_actors',
	timestamps: true,
});

Movie.belongsToMany(Genre, {
	through: 'movies_genres',
	timestamps: true,
});
Genre.belongsToMany(Movie, {
	through: 'movies_genres',
	timestamps: true,
});

module.exports = {
	Movie,
	Actor,
	Genre,
};
