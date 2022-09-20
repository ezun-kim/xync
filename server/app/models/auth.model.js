module.exports = (sequelize, Sequelize) => {
  const Auth = sequelize.define("auth", {
    username: {
      type: Sequelize.STRING
    },
    password: {
      type: Sequelize.STRING
    },
  });

  return Auth;
};
