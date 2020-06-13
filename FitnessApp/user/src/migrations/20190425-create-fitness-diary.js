'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('FitnessDiary', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      recordDate: {
        type: Sequelize.DATEONLY,
        allowNull: false
      },
      height: {
        type: Sequelize.STRING
      },
      weight: {
        type: Sequelize.STRING
      },
      waterIntake: {
        type: Sequelize.INTEGER
      },
      workout: {
        type: Sequelize.INTEGER
      },
      steps: {
        type: Sequelize.INTEGER
      },
      notes: {
        type: Sequelize.STRING
      },
      bmi: {
        type: Sequelize.STRING
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('FitnessDiary');
  }
};
