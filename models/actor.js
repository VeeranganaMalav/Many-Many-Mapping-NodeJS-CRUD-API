module.exports = (sequelize, Sequelize) => {
    const Actor = sequelize.define('actor', {
        actorName : {
            type : Sequelize.STRING,
            allowNull : false
        }
    },{
        timestamps : false
    });
    return Actor;
}