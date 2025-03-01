const express = require('express');
const path = require('path');
const sequelize = require('./data/db.js');
const { Movie, Genre, Actor } = require('./models/index.js');
const seedDatabase = require('./data/dummy-data.js');

const app = express();

async function initializeDatabase() {
	try {
		// Bağlantıyı test et
		await sequelize.authenticate();
		console.log('MySQL bağlantısı başarılı');

		// Tabloları oluştur
		await sequelize.sync({ force: true });
		console.log('Tablolar oluşturuldu');

		await seedDatabase();
	} catch (err) {
		console.log('Hata:', err);
	}
}

initializeDatabase();

app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: false }));

app.use('/libs', express.static(path.join(__dirname, 'node_modules')));
app.use('/static', express.static(path.join(__dirname, 'public')));

app.use('/', (req, res) => {
	res.send('emre');
});

app.listen(3000, () => {
	console.log('program working in 3000 ports');
});
