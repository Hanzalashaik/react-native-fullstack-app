import mongoose from "mongoose";
import config from "config";

const dbConnect = async () => {
  try {
    await mongoose.connect(config.get("MONGO_URI"));
    console.log("Connected to MongoDB");
  } catch (error) {
    console.log(error);
  }
};

dbConnect();
