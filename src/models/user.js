"use strict";

const bcrypt = require("bcrypt");
const { Model } = require("sequelize");
const sendWelcomeEmail = require("../helpers/sendMail");

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasMany(models.Message, { foreignKey: "sendenrId" });
      User.hasMany(models.Conversation, { foreignKey: "createdBy" });
      User.belongsToMany(models.Conversation, { through: "Participant" });
      User.hasMany(models.Participant, { foreignKey: "UserId" }); // decimos que un usuario tiene muchos participantes
    }
  }
  User.init(
    {
      firstname: DataTypes.STRING,
      lastname: DataTypes.STRING,
      email: DataTypes.STRING,
      avatar: DataTypes.STRING,
      password: DataTypes.STRING,
      description: DataTypes.STRING,
      validEmail: DataTypes.BOOLEAN,
    },
    {
      sequelize,
      modelName: "User",
      // timestamps: false // esto seria para que no se creen estampas de tiempo tambien se deben de borrar en la migracion
      hooks: {
        beforeCreate: async (user, options) => {
          const hashed = await bcrypt.hash(user.password, 10);
          user.password = hashed;
        },
        afterCreate: async (user, options) => {
          const { email, firstname, lastname } = user;
          sendWelcomeEmail(email, { firstname, lastname });
        },
      },
    }
  );
  return User;
};
