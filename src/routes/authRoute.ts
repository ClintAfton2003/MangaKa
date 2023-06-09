import { verifyToken } from "../middleware/verifyToken";
import { Router } from "express";

const router = Router();
import { showUsers, signin, login } from "../controllers/authController";

router.post("/", showUsers);
router.post("/signin", signin);
router.post("/login", verifyToken, login);

export default router;
