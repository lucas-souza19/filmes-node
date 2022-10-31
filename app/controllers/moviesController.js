const Joi = require('joi');
const MoviesModel = require('../models/moviesModel');

const schema = Joi.object().keys({
  name: Joi.string().required().min(1).max(50),
  director: Joi.string().required().min(1).max(50),
  link: Joi.string().required().min(1).max(150)
});

module.exports = class Movies {
  static async getMovie(req, res, next) {
    console.log('Controller Movie - get movie with ID', req.query._id);

    try {
      const movie = await MoviesModel.getMovie(req.query._id);

      if (!movie) {
        console.log('Filme: ', movie);
        res.status(404).json(`Não existe filme cadastrado.`);
        return;
      }

      console.log('Filme: ', movie);

      res.status(200).json(movie);
    } catch (error) {
      console.log(`[getmovie error] ${error}`);
      res.status(500).json({
        error: error
      });
      return;
    }
  }

  static async deleteMovie(req, res, next) {
    console.log('Controller Movie - delete movie with ID', req.query._id);

    try {
      const movie = await MoviesModel.deleteMovie(req.query._id);

      if (!movie) {
        res.status(404).json(`Erro ao deletar filme.`);
        return;
      }

      console.log('Filme: ', movie);

      res.status(200).json(movie);
    } catch (error) {
      console.log(`[deletemovie error] ${error}`);
      res.status(500).json({
        error: error
      });
      return;
    }
  }

  static async updateMovie(req, res, next) {
    console.log('Controller Movie - update movie with ID', req.query._id);

    try {
      const movie = await MoviesModel.updateMovie(req.query._id, req.body);

      if (!movie) {
        res.status(404).json(`Não existe filme cadastrado.`);
        return;
      }

      console.log('Filme: ', movie);

      res.status(200).json(movie);
    } catch (error) {
      console.log(`[updatemovie error] ${error}`);
      res.status(500).json({
        error: error
      });
      return;
    }
  }

  static async getMovies(req, res, next) {
    console.log('Controller Movies - get movies');
    try {
      const movies = await MoviesModel.getMovies();

      if (!movies) {
        res.status(404).json(`Não existe filme cadastrado.`);
        return;
      }

      movies.forEach(movie => {
        console.log('Filme: ', movie.nome);
      });

      res.status(200).json(movies);
    } catch (error) {
      console.log(`[getallmovies error] ${error}`);
      res.status(500).json({
        error: error
      });
      return;
    }
  }

  static async addMovie(req, res, next) {
    console.log('[Add Movie Controller]', req.body);
    
    const { error, value } = schema.validate(req.body);

    if (error) {
        const result = {
          msg: 'Filme não incluído. Campos não foram preenchidos corretamente.',
          error: error.details
        }
        res.status(404).json(result);
        return;
    }

    try {
      // const filme = {
      //   id: filmes.length + 1,
      //   name: req.body.name,
      //   director: req.body.director,
      //   link: req.body.link,
      // }
       const addedMovie = await MoviesModel.addMovie(req.body);
       res.status(200).json(addedMovie);
    } catch (error) {
       res.status(500).json({ error: error });
    }
 }
}