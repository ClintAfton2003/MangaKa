import { Schema, model } from "mongoose";
import { IUser } from "./userModel";

export interface IManga {
  author: Schema.Types.ObjectId | IUser;
  thumbnail: string;
  title: string;
  chapterNumber: number;
  genres: string[];
  description: string;
}

const MangaSchema = new Schema<IManga>(
  {
    author: { type: Schema.Types.ObjectId, ref: "User" },
    thumbnail: { type: String, require: [true, "Thumbnail is require"] },
    title: { type: String, require: [true, "Title is require"] },
    genres: { type: [String], require: [true, "genres is require"] },
    description: { type: String, require: [true, "description is require"] },
    chapterNumber: { type: Number, require: [true, "Chapter number is require"], minlength: 0 },
  },
  { timestamps: true }
);

const MangaModel = model<IManga>("Manga", MangaSchema);

export default MangaModel;
