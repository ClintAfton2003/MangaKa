import { Router } from "express";
import { UploadChapter, SeeChapterManga, ReadChapterManga, UpdateChapter, DeleteChapter } from "../controllers/chapterController";
import { verifyToken } from "../middleware/verifyToken";

const router = Router();

router.post("/upload/:mangaId", verifyToken, UploadChapter);
router.get("/:mangaId", SeeChapterManga);
router.get("/:mangaId/:chapterNumber", ReadChapterManga);
router.put("/update/:mangaId", verifyToken, UpdateChapter);
router.delete("/delete/:chapterId", verifyToken, DeleteChapter);

export default router;
