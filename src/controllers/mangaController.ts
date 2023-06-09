import { Request, Response, NextFunction } from "express";
import MangaModel from "../models/mangaModel";
import { FilterQuery } from "mongoose";
import { AuthRequest } from "../middleware/verifyToken";

interface ISearchManga {
  title?: string;
  chapterNumber?: number;
  genres?: string[];
}

export const searchManga = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { title, chapterNumber, genres } = req.query as ISearchManga;

    const searchFilter: FilterQuery<ISearchManga> = {};

    if (title) {
      searchFilter.title = { $regex: title, $options: "i" };
    }

    if (chapterNumber) {
      searchFilter.chapterNumber = chapterNumber;
    }

    if (genres) {
      searchFilter.genres = genres;
    }

    const mangas = await MangaModel.find(searchFilter).select("-updatedAt");

    res.status(200).json({
      status: "Success",
      data: mangas,
    });
  } catch (error) {
    res.status(400).json({ message: "Invalid sever!" });
  }
};

export const seeManga = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const mangas = await MangaModel.find({}).populate("author", "username").select("-updatedAt -description -genres");
    res.status(200).json({
      status: "Success",
      data: mangas,
    });
  } catch (error) {
    res.status(400).json({ message: "Invalid server!" });
  }
};

export const seeMangaDetail = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { mangaId } = req.params;
    const manga = await MangaModel.findById(mangaId).populate("author", "username").select("-updatedAt");
    res.status(200).json({
      status: "Success",
      data: manga,
    });
  } catch (error) {
    res.status(400).json({ message: "Invalid server!" });
  }
};

export const uploadManga = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    if (req.user?.role !== "admin") return res.status(404).json({ status: "Failed", message: "You don't have permission to do this!!" });

    const { title, thumbnail, chapterNumber, genres, description } = req.body;

    const uploadManga = await MangaModel.create({ title, thumbnail, chapterNumber, genres, description });

    res.status(200).json({
      status: "Success",
      data: {
        manga: uploadManga,
      },
    });
  } catch (error) {
    res.status(400).json({ message: "Invalid server!" });
  }
};

export const UpdateManga = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    if (req.user?.role !== "admin") return res.status(404).json({ status: "Failed", message: "You don't have permission to do this!!" });

    const { mangaId } = req.params;
    const newManga = await MangaModel.findByIdAndUpdate(mangaId, { ...req.body }, { new: true });
    res.status(200).json({
      status: "Success",
      data: newManga,
    });
  } catch (error) {
    res.status(400).json({ message: "Invalid server!" });
  }
};

export const DeleteManga = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    if (req.user?.role !== "admin") return res.status(404).json({ status: "Failed", message: "You don't have permission to do this!!" });

    const { mangaId } = req.params;
    await MangaModel.findByIdAndRemove(mangaId);

    res.status(200).json({
      status: "Delete Success",
    });
  } catch (error) {
    res.status(400).json({ message: "Invalid server!" });
  }
};
