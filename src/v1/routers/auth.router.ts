import Router from "express";
import { AuthController } from "../controllers/auth.controller";
import { authenticate } from "../middlewares/auth.middleware";
const AuthRouter = Router();

AuthRouter.post("/signup", AuthController.signup);
AuthRouter.post("/signin", AuthController.signin);
AuthRouter.post("/logout", AuthController.logout);
AuthRouter.get("/me", authenticate, AuthController.me);
export default AuthRouter;
