const dbConfig = require("../config/config.js");
const Sequelize = require('sequelize');

const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
    host : dbConfig.HOST,
    dialect : dbConfig.dialect
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.actor = require('./actor')(sequelize, Sequelize);
db.movie = require('./movie')(sequelize, Sequelize);
db.actormovie = require('./actor_movie')(sequelize, Sequelize);

db.actor.belongsToMany(db.movie, {through : db.actormovie});
db.movie.belongsToMany(db.actor, {through : db.actormovie});

module.exports = db;