const db = require('../models/index.js');
const Actor = db.actor;
const Movie = db.movie;

//POST -> create a new movie
exports.createMovie = (req,res) => {
    Movie.create(req.body)
        .then((data) => {res.send(data);})
        .catch((err) => {
            res.status(500).send({message : err.message || "Some error occurred while creating the movie."});
        });
};

//GET -> get all movies
exports.getAllMovies = (req,res) => {
    Movie.findAll({
        include : [
            {
                model : Actor,
                attributes : ["id", "actorName"],
                through : {
                    attributes : []
                }
            }
        ]
    })
        .then((data) => {res.status(200).send(data);})
        .catch((err) => {
            res.status(500).send({message : err.message || "Some error occurred while retrieving movies."});
        });
};

//GET(movieId) -> get movie with given id
exports.getMovieWithId = (req,res) => {
    const id = req.params.movieId;
    Movie.findByPk(id)
        .then((data) => {
            if(data){
                res.send(data);
            }
            else{
                res.status(404).send({message : `Cannot find movie with id = ${id}.`})
            }
        }).catch((err) => {
            res.status(500).send({message : `Error retrieving movie with id = ${id}.`});
        });
};

//PUT -> update movie by id
exports.updateMovie = (req,res) => {
    const id = req.params.movieId;
    Movie.update(req.body, {
        where : {id : id}
    })
    .then((num) => {
        if(num == 1){
            res.send({message : `Movie with id = ${id} was updated successfully.`});
        }
        else{
            res.send({message : `Cannot update movie with id = ${id}.`});
        }
    }).catch((err) => {
        res.status(500).send({message : `Error updating movie with id = ${id}`});
    });
};

//DELETE -> delete movie by id
exports.deleteMovie = (req,res) => {
    const id = req.params.movieId;
    Movie.destroy({
        where : {id : id}
    })
    .then((num) => {
        if(num == 1){
            res.send({message : `Movie with id = ${id} was deleted successfully.`});
        }
        else{
            res.send({message : `Cannot delete movie with id = ${id}.`});
        }
    }).catch((err) => {
        res.status(500).send({message : `Could not delete movie with id = ${id}`});
    });
};