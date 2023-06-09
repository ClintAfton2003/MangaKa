import bcrypt from "bcryptjs";
import { Request, Response, NextFunction } from "express";
import UserModel from "../models/userModel";
import jwt from "jsonwebtoken";

export const showUsers = async (req: Request, res: Response, next: NextFunction) => {};
export const signin = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { username, email, password, role = "guest" } = req.body;

    const user = await UserModel.create({ username, email, password, role });

    const token = jwt.sign({ userID: user.id, role }, "auth1");

    res.status(200).json({
      status: "Success",
      data: { user, token },
    });
  } catch (error) {
    res.status(400).json({ message: "Invalid" });
  }
};
export const login = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = await UserModel.findOne({ email: req.body.email });
    if (!user) {
      return res.status(400).json({ message: "Email is not correct" });
    }

    const passwordValid = bcrypt.compareSync(req.body.password, user.password);
    if (!passwordValid) {
      return res.status(400).json({ message: "Password is incorrect!" });
    }

    let roleAuth = user.role;

    if (roleAuth === "guest") {
      roleAuth = "user";
      await UserModel.findOneAndUpdate({ email: req.body.email }, { role: roleAuth }, { new: true });
    }

    const token = jwt.sign({ userID: user._id, role: user.role }, "auth1");

    res.status(200).json({
      status: "Success",
      data: { userName: user.username, token },
    });
  } catch (error) {
    next(error);
  }
};
