"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Messages", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      content: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      sendenrId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        // LAS REFERENCIAS SON LAS LLAVES FORANEAS
        references: {
          model: "Users",
          key: "id",
        },
      },
      conversationId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        // LLAVE FORANEA
        references: {
          model: "Conversations",
          key: "id",
        },
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Messages");
  },
};
