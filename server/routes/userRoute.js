import express from "express";
import {
  register,
  login,
  updateUser,
  validationMiddleware,
} from "../controllers/userController.js";

const router = express.Router();

router.post("/register", register);

router.post("/login", login);

router.put("/update-user", validationMiddleware, updateUser);

export default router;
