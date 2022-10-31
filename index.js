const app = require('./config/server');
const routes = require('./app/routes/routes');

routes.getMovie(app);
routes.addMovie(app);
routes.getMovies(app);
routes.deleteMovie(app);
routes.updateMovie(app);


