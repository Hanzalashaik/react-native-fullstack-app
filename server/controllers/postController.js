import postModel from "../models/postModel.js";
import userModel from "../models/userModel.js";

export const createPostController = async (req, res) => {
  console.log(req.body);
  try {
    const { title, description } = req.body;
    console.log(title, description);

    if (!title || !description) {
      return res.status(400).json({
        success: false,
        message: "Please fill all the fields",
      });
    }
    // console.log(req.auth);

    // Assuming req.auth.email is the email of the authenticated user
    const user = await userModel.findOne({ _id: req.auth._id });
    // console.log(user);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    const newPost = new postModel({
      title,
      description,
      postedBy: user._id,
    });

    // Save the post
    await newPost.save();

    return res.status(201).json({
      success: true,
      message: "Post created successfully",
      newPost,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export const getPostController = async (req, res) => {
  try {
    const posts = await postModel
      .find()
      .populate("postedBy", "_id username email")
      .sort({ createdAt: -1 });
    return res.status(200).json({
      success: true,
      posts,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export const getUserPostsController = async (req, res) => {
  try {
    const posts = await postModel
      .find({ postedBy: req.auth._id })
      .populate("postedBy", "_id username email");
    return res.status(200).json({
      success: true,
      posts,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export const deletePostController = async (req, res) => {
  try {
    const { id } = req.params;
    await postModel.findByIdAndDelete({ _id: id });

    return res.status(200).json({
      success: true,
      message: "Post deleted successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export const updatePostController = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description } = req.body;
    if (!title || !description) {
      return res.status(400).json({
        success: false,
        message: "Please fill all the fields",
      });
    }

    const updatedPost = await postModel.findByIdAndUpdate(
      { _id: id },
      { title, description },
      { new: true }
    );
    return res.status(200).json({
      success: true,
      message: "Post updated successfully",
      updatedPost,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};
