import User from "./user.js";
import UserToken from "./user_token.js";

export const UserTokenAssociation = () => {
  User.hasOne(UserToken, {
    foreignKey: "user_id",
    onDelete: "CASCADE",
  });
  UserToken.belongsTo(User, {
    foreignKey: "user_id",
    onDelete: "CASCADE",
  });
};
