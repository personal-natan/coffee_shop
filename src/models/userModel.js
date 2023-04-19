const { Model, DataTypes, UUID } = require("sequelize");
const db = require("../config/database");

const bcrypt = require("bcrypt");

class User extends Model {}

User.init(
  {
    id: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isEmail: true,
      },
    },
    username: {
      type: DataTypes.STRING,
      unique: true,
      // hide this field information for method GET
      get(value) {
        const rawValue = this.setDataValue("username");
        // return rawValue ? rawValue.toUpperCase() : null;
      },
    },
    password: {
      type: DataTypes.STRING,
      // hide this field information for method GET
      // get() {
      //   const rawValue = this.setDataValue("password");
      // },
      // auto hash password to database everytime user input a new password
      set(value) {
        const salt = bcrypt.genSaltSync(12);
        const hash = bcrypt.hashSync(value, salt);
        this.setDataValue("password", hash);
      },
    },
  },
  { sequelize: db, modelName: "User" }
);

module.exports = User;
