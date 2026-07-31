import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import IndexRouter from "./v1/routers/index.router";
dotenv.config();

const app = express();

app.use(cors({
  origin: '*',
  methods: ['POST', 'GET', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}))
app.use(cookieParser());
app.use(express.json());

const PORT = process.env.PORT || 8000;

app.use("/api/v1",IndexRouter);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
})   