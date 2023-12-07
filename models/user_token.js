import { DataTypes } from "sequelize";
import sequelize from "./index.js";

const UserToken = sequelize.define("user_token", {
  refreshToken: {
    type: DataTypes.STRING(500),
    allowNull: false
  },
});

export default UserToken;
