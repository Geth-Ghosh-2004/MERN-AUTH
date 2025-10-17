import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import { connectDB } from "./Db/connectDb.js";
import authRouts from "./routes/authroute.js";
import cors from "cors";

dotenv.config();

const app = express();
const port = process.env.PORT;

app.use(cors({ origin: "http://localhost:5173", credentials: true }));

// 🔹 Middlewares
app.use(cookieParser()); // ✅ এটা আগে রাখো
app.use(express.json());

// 🔹 Routes
app.use("/api/auth", authRouts);

// 🔹 Database connection
connectDB().then(() => {
  app.listen(port, () => {
    console.log("running on port:", port);
  });
});
