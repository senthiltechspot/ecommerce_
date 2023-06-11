const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('senthiltechspot', 'senthiltechspot', 'G#Cejv_p$y2HTR3', {
  host: 'db4free.net',
  dialect: 'mysql',
});

module.exports = sequelize;
