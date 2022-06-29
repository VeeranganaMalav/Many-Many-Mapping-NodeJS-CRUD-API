const db = require('../models/index.js');
const Actor = db.actor;
const Movie = db.movie;
const ActorMovie = db.actormovie;

//POST -> create a new actor
exports.createActor = (req,res) => {
    Actor.create(req.body)
        .then((data) => {res.send(data);})
        .catch((err) => {
            res.status(500).send({message : err.message || "Some error occurred while creating the actor."});
        });
};

//GET -> get all actors
exports.getAllActors = (req,res) => {
    Actor.findAll({
        include : [
            {
                model : Movie,
                attributes : ["id", "movieName"],
                through : {
                    attributes : []
                }
            }
        ]
    })
    .then((data) => {res.status(200).send(data);})
    .catch((err) => {
        res.status(500).send({message : err.message || "Some error occurred while retrieving actors."});
    });
};

//GET(actorId) -> get actor with given id
exports.getActorWithId = (req,res) => {
    const id = req.params.actorId;
    Actor.findByPk(id)
        .then((data) => {
            if(data){
                res.send(data);
            }
            else{
                res.status(404).send({message : `Cannot find actor with id = ${id}.`})
            }
        }).catch((err) => {
            res.status(500).send({message : `Error retrieving actor with id = ${id}.`});
        });
};

//PUT -> update actor by id
exports.updateActor = (req,res) => {
    const id = req.params.actorId;
    Actor.update(req.body, {
        where : {id : id}
    })
    .then((num) => {
        if(num == 1){
            res.send({message : `Actor with id = ${id} was updated successfully.`});
        }
        else{
            res.send({message : `Cannot update actor with id = ${id}.`});
        }
    }).catch((err) => {
        res.status(500).send({message : `Error updating actor with id = ${id}`});
    });
};

//DELETE -> delete actor by id
exports.deleteActor = (req,res) => {
    const id = req.params.actorId;
    Actor.destroy({
        where : {id : id}
    })
    .then((num) => {
        if(num == 1){
            res.send({message : `Actor with id = ${id} was deleted successfully.`});
        }
        else{
            res.send({message : `Cannot delete actor with id = ${id}.`});
        }
    }).catch((err) => {
        res.status(500).send({message : `Could not delete actor with id = ${id}`});
    });
};

//ADD -> add Movie to an Actor
/* exports.addMovie = (req,res) => {
    const actorId = req.body.actorId;
    const movieId = req.body.movieId;

    Actor.findByPk(actorId)
        .then((actor) => {
            if(!actor){
                res.send({message : `Actor with id = ${actorId} not found`});
                return null;
            }
            return Movie.findByPk(movieId)
                        .then((movie) => {
                            if(!movie){
                                res.send({message : `Movie with id = ${movieId} not found`});
                                return null;
                            }
                            actor.addMovie(movie);
                            res.send({message : `Added movie with id = ${movieId} to actor with id = ${actorId}`});
                            return actor;
                        });
        }).catch((err) => {
            res.status(500).send({message : `Error while adding movie with id = ${movieId} to actor with id = ${actorId}`});
        });
}; */

//POST(actor, movie) -> create a record for actor and movie
exports.createActorMovie = (req,res) => {

    ActorMovie.create(req.body)
                .then((data) => {res.send(data);})
                .catch((err) => {
                    res.status(500).send({message : err.message || "Some error occurred while creating a record for actor and movie."});
                });
};