import { Schema, model } from "mongoose";
import { IManga } from "./mangaModel";

export interface IChapter {
  manga: Schema.Types.ObjectId | IManga;
  chapter: number;
  chapterImage: string[];
}

const ChapterSchema = new Schema<IChapter>({
  manga: { type: Schema.Types.ObjectId, ref: "Manga" },
  chapter: { type: Number, require: [true, "Chapter is require"] },
  chapterImage: [{ type: String, require: [true, "Chapter image is require"] }],
});

const ChapterModel = model<IChapter>("Chapter", ChapterSchema);

export default ChapterModel;
