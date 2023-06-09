import { AuthRequest } from "./../middleware/verifyToken";
import { Request, Response, NextFunction } from "express";
import MangaModel from "../models/mangaModel";
import ChapterModel from "../models/chapterModel";

export const SeeChapterManga = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { mangaId } = req.params;
    const manga = await MangaModel.findById(mangaId);
    if (!manga) return res.status(404).json({ message: "Not found" });
    const chapter = await ChapterModel.find({ manga: mangaId }).select("-chapterImage");

    res.status(200).json({
      status: "Success",
      data: chapter,
    });
  } catch (error) {
    res.status(400).json({ message: "Invalid server!" });
  }
};

export const ReadChapterManga = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { mangaId, chapterNumber } = req.params;
    const manga = await MangaModel.findById(mangaId);
    if (!manga) return res.status(404).json({ message: "Not found" });
    const chapter = await ChapterModel.find({ manga: mangaId, chapter: chapterNumber }).populate("manga", "title");

    res.status(200).json({
      status: "Success",
      data: chapter,
    });
  } catch (error) {
    res.status(400).json({ message: "Invalid server!" });
  }
};

export const UploadChapter = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    if (req.user?.role !== "admin") return res.status(404).json({ status: "Failed", message: "You don't have permission to do this!!" });

    const { chapter, chapterImage } = req.body;
    const { mangaId } = req.params;
    const manga = await MangaModel.findById(mangaId);
    if (!manga) return res.status(404).json({ message: "Not found" });

    const chapters = await ChapterModel.create({ manga: mangaId, chapter, chapterImage });

    res.status(200).json({
      status: "Success",
      data: {
        chapter: chapters,
      },
    });
  } catch (error) {
    res.status(400).json({ message: "Invalid server!" });
  }
};

export const UpdateChapter = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    if (req.user?.role !== "admin") return res.status(404).json({ status: "Failed", message: "You don't have permission to do this!!" });

    const { mangaId } = req.params;
    const manga = await MangaModel.findById(mangaId);
    if (!manga) return res.status(404).json({ message: "Not found" });
    const { chapter } = req.body;

    const newChapters = await ChapterModel.findOneAndUpdate({ manga: mangaId, chapter }, { ...req.body }, { new: true });

    res.status(200).json({
      status: "Success",
      data: {
        chapter: newChapters,
      },
    });
  } catch (error) {
    res.status(400).json({ message: "Invalid server!" });
  }
};

export const DeleteChapter = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    if (req.user?.role !== "admin") return res.status(404).json({ status: "Failed", message: "You don't have permission to do this!!" });

    const { chapterId } = req.params;

    await ChapterModel.findByIdAndRemove(chapterId);

    res.status(200).json({
      status: "Delete Success",
    });
  } catch (error) {
    res.status(400).json({ message: "Invalid server!" });
  }
};
