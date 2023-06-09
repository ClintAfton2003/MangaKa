import { Router } from "express";
import { uploadManga, seeManga, seeMangaDetail, searchManga, UpdateManga, DeleteManga } from "../controllers/mangaController";
import { verifyToken } from "../middleware/verifyToken";

const router = Router();

router.get("/", seeManga);
router.get("/detail/:mangaId", seeMangaDetail);
router.get("/search", searchManga);
router.post("/upload", verifyToken, uploadManga);
router.put("/update/:mangaId", verifyToken, UpdateManga);
router.delete("/delete/:mangaId", verifyToken, DeleteManga);
export default router;
