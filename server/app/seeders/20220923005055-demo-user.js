'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {

    return Promise.all([
      queryInterface.bulkInsert('Users', [{
        username: 'admin',
        password: '1234',
        name: 'admin',
        company_name: 'xync',
        role: "admin",
        email_auth: true,
        email: 'support@xync.studio',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        username: 'chkmate',
        password: '1234',
        name: 'admin',
        company_name: 'xync',
        role: "admin",
        email_auth: true,
        email: 'chkmate@xync.studio',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        username: 'company1',
        password: '1234',
        name: 'admin',
        company_name: 'xync',
        role: "company",
        email_auth: true,
        email: 'company1@xync.studio',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        username: 'user1',
        password: '1234',
        name: 'admin',
        company_name: 'xync',
        role: "user",
        email_auth: true,
        email: 'user1@xync.studio',
        createdAt: new Date(),
        updatedAt: new Date()
      }])
    ]);
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Users', null, {});
  }
};