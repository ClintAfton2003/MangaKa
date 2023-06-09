import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";

export interface AuthRequest extends Request {
  user?: {
    userID: string;
    role: string;
  };
}

export const verifyToken = async (req: AuthRequest, res: Response, next: NextFunction) => {
  const Authorization = req.header("authorization");

  if (!Authorization) return res.status(401).json({ messase: "Unauthorized" });

  const token = Authorization.replace("Bearer ", "");

  try {
    if (!token) return res.status(401).json({ message: "Unauthorized Token" });

    const payLoad = (await jwt.verify(token, "auth1")) as JwtPayload;
    const { userID, role } = payLoad;

    req.user = { userID, role };
    next();
  } catch (error) {
    return res.status(401).json({ message: "Unauthorization: " + String(error) });
  }
};
