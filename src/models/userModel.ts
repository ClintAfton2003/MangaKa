import { Schema, model } from "mongoose";
import bcrypt from "bcryptjs";

export interface IUser {
  username: string;
  email: string;
  password: string;
  role: string;
}

const UserSchema = new Schema({
  username: { type: String, require: [true, "Username is require"] },
  email: { type: String, require: [true, "Email is require"] },
  password: { type: String, require: [true, "Password is require"] },
  role: { type: String, require: [true, "Role is require"] },
});

UserSchema.pre<IUser>("save", function (next) {
  let user = this as IUser;

  bcrypt.hash(user.password, 10, (error: Error, hash: string) => {
    if (error) return next(error);

    user.password = hash;
    next();
  });
});

const UserModel = model<IUser>("User", UserSchema);

export default UserModel;
