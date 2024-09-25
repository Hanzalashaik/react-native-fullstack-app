import express from "express";
import config from "config";
import cors from "cors";
import morgan from "morgan";
import colors from "colors";
import authRoute from "./routes/userRoute.js";
import postRoute from "./routes/postRoute.js";

import "./utils/dbConnect.js";

const PORT = config.get("PORT");
const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

//Routes
app.use("/api/v1/auth", authRoute);
app.use("/api/v1/post", postRoute);

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`.yellow.bold);
});
