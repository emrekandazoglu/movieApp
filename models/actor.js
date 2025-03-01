const { DataTypes } = require('sequelize');
const sequelize = require('../data/db');

const Actor = sequelize.define('actor', {
	id: {
		type: DataTypes.INTEGER,
		autoIncrement: true,
		primaryKey: true,
	},
	name: {
		type: DataTypes.STRING,
		allowNull: false,
	},
	birth_year: {
		type: DataTypes.INTEGER,
	},
});

module.exports = Actor;
