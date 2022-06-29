module.exports = (sequelize, Sequelize) => {
    const Movie = sequelize.define('movie', {
        movieName : {
            type : Sequelize.STRING,
            allowNull : false
        }
    },{
        timestamps : false
    });
    return Movie;
}