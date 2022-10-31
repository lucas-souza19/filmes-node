const client = require('../../config/dbConnection')
const { ObjectId } = require('mongodb');

module.exports = class MoviesModel {
    static async getMovie(id) {

        const movie = await client.db("dsw").collection("movies").findOne({
            _id: new ObjectId(id)
        });

        console.log('Filme: ', movie);

        return movie;
    }

    static async deleteMovie(id) {
        console.log(`[deletemovie]`, id);
        const movie = await client.db("dsw").collection("movies").deleteOne({
            _id: new ObjectId(id)
        });
        return movie;
    }

    static async updateMovie(id, data) {
        console.log(`[updatemovie]`, id);

        const updateMovie = { name: data.name, director: data.director, link: data.link,
            date: new Date()
        }

        const movie = await client.db("dsw").collection("movies").updateOne({
            _id: new ObjectId(id)
        }, {$set: {link: updateMovie.link, name: updateMovie.name, director: updateMovie.director, date: updateMovie.date}});
        return movie;
    }

    static async getMovies() {
        console.log(`[getallmovies]`);
        const cursor = await client.db("dsw").collection("movies").find();
        const movies = await cursor.toArray();
        return movies;
    }

    static async addMovie(data) {
        console.log(`[Movie Model - Add Movie] ${data}`);
        try {
            const newMovie = { name: data.name, director: data.director, link: data.link,
                date: new Date()
            }
            const addedMovie = await client.db("dsw").collection("movies").insertOne(newMovie);
            console.log(`New movie inserted with the following id ${addedMovie.insertedId}`);
            return addedMovie;
        } catch (error) {
            console.log(`[movieService] Error: ${error}`);
        } 
    }
}