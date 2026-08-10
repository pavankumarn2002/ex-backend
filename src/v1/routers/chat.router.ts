import Router from "express";
import { ChatController } from "../controllers/chat.controller";
import { authenticate } from "../middlewares/auth.middleware";
const ChatRouter = Router();
ChatRouter.get("/users", authenticate, ChatController.getAllUsers);
export default ChatRouter;
