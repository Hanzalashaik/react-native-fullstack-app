import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, "Please provide a username"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Please provide an email"],
      trim: true,
    },
    password: {
      type: String,
      required: [true, "Please provide a password"],
      min: 6,
      max: 20,
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("User", userSchema);
