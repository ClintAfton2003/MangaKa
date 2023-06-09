import { Router } from "express";
import { WriteComment, SeeComment, UpdateComment, DeleteComment } from "../controllers/commentController";
import { verifyToken } from "../middleware/verifyToken";

const router = Router();

router.post("/cmt/:mangaId", verifyToken, WriteComment);
router.get("/:mangaId", verifyToken, SeeComment);
router.put("/update/:commentId", verifyToken, UpdateComment);
router.delete("/delete/:commentId", verifyToken, DeleteComment);

export default router;
