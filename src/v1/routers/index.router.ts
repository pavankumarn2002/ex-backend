import Router from "express";
import AuthRouter from "./auth.router";
import ChatRouter from "./chat.router"
const IndexRouter = Router();

IndexRouter.use("/auth",AuthRouter);
IndexRouter.use("/chat", ChatRouter);
export default IndexRouter;