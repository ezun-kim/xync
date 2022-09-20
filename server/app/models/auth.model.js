module.exports = (sequelize, Sequelize) => {
  return sequelize.define("auth", {
    username: {
      type: Sequelize.STRING
    },
    password: {
      type: Sequelize.STRING
    },
  });
};
