module.exports = (sequelize, Sequelize) => {
    const Actor = require('./actor')(sequelize, Sequelize);
    const Movie = require('./movie')(sequelize, Sequelize);
    const ActorMovie = sequelize.define('actormovie', {
        id : {
            type : Sequelize.INTEGER,
            autoIncrement : true,
            primaryKey : true
        },
        movieId : {
            type : Sequelize.INTEGER,
            references : {
                model : Movie,
                key : 'id'
            }
        },
        actorId : {
            type : Sequelize.INTEGER,
            references : {
                model : Actor,
                key : 'id'
            }
        }
    },
    {
        timestamps : false
    });
    return ActorMovie;
}