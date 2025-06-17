import { Router } from "express";
import { Login, Logout, SignUp, validate } from "../controllers/AuthController";

const router: Router = Router();

router.post("/signup", SignUp as any);
router.post("/login", Login as any);
router.get("/logout", Logout as any);
router.post("/validate",validate as any)

export default router;
