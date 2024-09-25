import express from "express";
import {
  updateUser,
  validationMiddleware,
} from "../controllers/userController.js";
import {
  createPostController,
  deletePostController,
  getPostController,
  getUserPostsController,
  updatePostController,
} from "../controllers/postController.js";
const router = express.Router();

router.post("/create-post", validationMiddleware, createPostController);

router.get("/get-posts", getPostController);

router.get("/get-user-posts", validationMiddleware, getUserPostsController);

router.delete("/delete-post/:id", validationMiddleware, deletePostController);

router.put("/update-post/:id", validationMiddleware, updatePostController);

export default router;
