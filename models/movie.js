const { DataTypes } = require('sequelize');
const sequelize = require('../data/db');

const Movie = sequelize.define('movie', {
	id: {
		type: DataTypes.INTEGER,
		autoIncrement: true,
		primaryKey: true,
	},
	title: {
		type: DataTypes.STRING,
		allowNull: false,
	},
	release_year: {
		type: DataTypes.INTEGER,
	},
	duration: {
		type: DataTypes.INTEGER,
	},
});

module.exports = Movie;
