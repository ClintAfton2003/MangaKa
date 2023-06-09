import { Request, Response, NextFunction } from "express";
import MangaModel from "../models/mangaModel";
import CommentModel from "../models/commentModel";
import UserModel from "../models/userModel";
import { AuthRequest } from "../middleware/verifyToken";

export const WriteComment = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const userId = req.user?.userID;
    const { mangaId } = req.params;
    const { content } = req.body;
    const manga = await MangaModel.findById(mangaId);
    if (!manga) return res.status(404).json({ message: "Not found" });
    const user = await UserModel.findById(userId);
    if (!user) return res.status(404).json("User not found!");

    const comment = await CommentModel.create({ manga: mangaId, user: userId, content });

    res.status(200).json({
      status: "Success",
      data: {
        comment: comment,
      },
    });
  } catch (error) {
    res.status(400).json({ message: "Invalid server!" });
  }
};

export const SeeComment = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const userId = req.user?.userID;

    const { mangaId } = req.params;

    const manga = await MangaModel.findById(mangaId);
    if (!manga) return res.status(404).json({ message: "Not found" });

    const user = await UserModel.findById(userId);
    if (!user) return res.status(404).json("User not found!");

    const comment = await CommentModel.find({ manga: mangaId }).populate("user", "username").select("-updatedAt");

    res.status(200).json({
      status: "Success",
      data: comment,
    });
  } catch (error) {
    res.status(400).json({ message: "Invalid server!" });
  }
};

export const UpdateComment = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const { commentId } = req.params;
    const newComment = await CommentModel.findByIdAndUpdate(commentId, { ...req.body }, { new: true });

    res.status(200).json({
      status: "Success",
      data: newComment,
    });
  } catch (error) {
    res.status(400).json({ message: "Invalid server!" });
  }
};

export const DeleteComment = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const { commentId } = req.params;
    await CommentModel.findByIdAndRemove(commentId);

    res.status(200).json({
      status: "Delete Success",
    });
  } catch (error) {
    res.status(400).json({ message: "Invalid server!" });
  }
};
