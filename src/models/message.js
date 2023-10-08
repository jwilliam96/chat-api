"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Message extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Message.belongsTo(models.User, { foreignKey: "sendenrId" });
      Message.belongsTo(models.Conversation, { foreignKey: "conversationId" });
    }
  }
  Message.init(
    {
      content: DataTypes.STRING,
      sendenrId: DataTypes.INTEGER,
      conversationId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Message",
      // ESTE ESTAMPADO DE TIEMPO DICE QUE SI LO HAGA ECEPTO updatedAt
      timestamps: true,
      updatedAt: false,
    }
  );
  return Message;
};
