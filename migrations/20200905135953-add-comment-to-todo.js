'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.addColumn(
      "Todos",
      "comment",
      {
        type: Sequelize.TEXT
      }
    )
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.removeColumn("Todos", "comment");
  }
};
