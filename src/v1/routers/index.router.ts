import Router from "express";
import AuthRouter from "./auth.router";

const IndexRouter = Router();

IndexRouter.use("/auth",AuthRouter);

export default IndexRouter;