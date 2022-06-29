module.exports = (app) => {
    const router = require('express').Router();
    const actor = require('../controller/actorController.js');
    const movie = require('../controller/movieController.js');

     // Create a new Actor
    router.post("/actor", actor.createActor);

    // Create a new Movie
    router.post("/movie", movie.createMovie);

    // Retrieve all Actors
    router.get("/actors", actor.getAllActors);

    // Retrieve all Movies
    router.get("/movies", movie.getAllMovies);

    // Retrieve an actor with an id
    router.get("/actor/:actorId", actor.getActorWithId);

    // Retrieve a movie with an id
    router.get("/movie/:movieId", movie.getMovieWithId);
    
    // Update an actor with an id
    router.put("/actor/:actorId", actor.updateActor);

    // Update a movie with an id
    router.put("/movie/:movieId", movie.updateMovie);
 
    // Delete an actor with an id
    router.delete("/actor/:actorId", actor.deleteActor);

    // Delete a movie with an id
    router.delete("/movie/:movieId", movie.deleteMovie);

    // Add  a movie to an actor
    // router.post("/actor/movie", actor.addMovie);

    // Create a record for actor and movie
    router.post("/actor/movie", actor.createActorMovie);

    app.use('/api', router);
}