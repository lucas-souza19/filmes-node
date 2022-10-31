const MoviesController = require('../controllers/moviesController');

module.exports = {
    getMovie: (app) => {
        app.get('/api/filme', MoviesController.getMovie);
    },
    getMovies: (app) => {
        app.get('/api/filmes', MoviesController.getMovies);
    },
    addMovie: (app) => {
        console.log('add')
        app.post('/api/incluir/filmes', MoviesController.addMovie);
    },
    deleteMovie: (app) => {
        app.get('/api/deletar/filme', MoviesController.deleteMovie);
    }, 
    updateMovie: (app) => {
        app.get('/api/atualizar/filme', MoviesController.updateMovie);
    },      
}
