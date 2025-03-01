const { DataTypes } = require('sequelize');
const sequelize = require('../data/db');

const Genre = sequelize.define('genre', {
	id: {
		type: DataTypes.INTEGER,
		autoIncrement: true,
		primaryKey: true,
	},
	name: {
		type: DataTypes.STRING,
		allowNull: false,
	},
});

module.exports = Genre;
