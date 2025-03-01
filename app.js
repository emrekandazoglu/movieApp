const express = require('express');
const path = require('path');
const sequelize = require('./data/db.js');
const { Movie, Genre, Actor } = require('./models/index.js');
const seedDatabase = require('./data/dummy-data.js');
const expressLayouts = require('express-ejs-layouts');
const movieRoutes = require('./routes/movieRoutes');

const app = express();

async function initializeDatabase() {
	try {
		await sequelize.authenticate();
		console.log('MySQL bağlantısı başarılı');

		await sequelize.sync({ force: true });
		console.log('Tablolar oluşturuldu');

		await seedDatabase();
	} catch (err) {
		console.log('Hata:', err);
	}
}

initializeDatabase();

// View engine setup
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(expressLayouts);
app.set('layout', 'layouts/layout');

// Middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Static files
app.use('/libs', express.static(path.join(__dirname, 'node_modules')));
app.use('/static', express.static(path.join(__dirname, 'public')));

// Routes
app.use('/movies', movieRoutes);

// Redirect root to movies
app.get('/', (req, res) => {
	res.redirect('/movies');
});

// 404 handler
app.use((req, res, next) => {
	res.status(404).render('404', { title: 'Sayfa Bulunamadı' });
});

// Error handler
app.use((err, req, res, next) => {
	console.error(err.stack);
	res.status(500).render('error', {
		title: 'Hata Oluştu',
		message:
			process.env.NODE_ENV === 'development' ? err.message : 'Bir hata oluştu',
	});
});

// Server
app.listen(3000, () => {
	console.log('Server http://localhost:3000 adresinde çalışıyor');
});
