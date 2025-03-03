import express from "express";
import dotenv from "dotenv";
import { connectDb } from "./config/db.js";
import router from "./routes/BookRoutes.js";

dotenv.config();

const app = express();

app.use(express.json());

app.use("/api/book", router);

app.listen(process.env.SERVER_PORT || 5000, () => {
  connectDb();
  console.log(`Server Started at http://localhost:5000`);
});
