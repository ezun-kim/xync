module.exports = (sequelize, Sequelize) => {
  const Auth = sequelize.define("auth", {
    id: {
      type: Sequelize.STRING
    },
    password: {
      type: Sequelize.STRING
    },
  });

  return Auth;
};
