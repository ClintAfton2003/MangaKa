import { Schema, model } from "mongoose";
import { IManga } from "./mangaModel";
import { IUser } from "./userModel";

export interface IComment {
  manga: Schema.Types.ObjectId | IManga;
  user: Schema.Types.ObjectId | IUser;
  content: String;
}

const CommentSchema = new Schema<IComment>(
  {
    manga: { type: Schema.Types.ObjectId, ref: "Manga" },
    user: { type: Schema.Types.ObjectId, ref: "User" },
    content: { type: String, require: [true, "Comment is require"] },
  },
  { timestamps: true }
);

const CommentModel = model<IComment>("Comment", CommentSchema);

export default CommentModel;
