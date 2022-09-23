module.exports = (sequelize, Sequelize) => {
  return sequelize.define("user", {
    username: {
      type: Sequelize.STRING
    },
    password: {
      type: Sequelize.STRING
    },
    name: {
      type: Sequelize.STRING
    },
    email: {
      type: Sequelize.STRING
    },
    email_auth: {
      type: Sequelize.BOOLEAN
    },
    role: {
      type: Sequelize.STRING
    },
  });
};
