import express from "express"
import { login, logout, signup, test2 } from "../controllers/authController.js";

const router = express.Router();

router.post("/signup", signup)
router.post("/login", login)
router.post("/logout", logout)
router.get("/test2",test2);


export default router;