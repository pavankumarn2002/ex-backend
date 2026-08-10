import Router, { type Request, type Response } from "express";
import { prisma } from "../../lib/prisma";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export interface AuthController {
    signup: (req: Request, res: Response) => void;
    signin: (req: Request, res: Response) => void;
    logout: (req: Request, res: Response) => void;
    me: (req: Request, res: Response) => void;
}
const COOKIE_AGE = 30 * 24 * 60 * 60 * 1000;

export const AuthController: AuthController = {
    signup: async (req: Request, res: Response) => {
        const { email, password, userName } = req.body;
        const existingUser = await prisma.user.findUnique({ where: { email } });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await prisma.user.create({
            data: {
                userName,
                email,
                password: hashedPassword,
            },
        });
        const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET as string, { expiresIn: "7d" });
        const sanitizeUser = (user: any) => {
            const { email, userId } = user;
            return { email, userId };
        };
        res.cookie("user", sanitizeUser(user), { httpOnly: true, secure: false, sameSite: "lax", maxAge: COOKIE_AGE });
        res.cookie("token", token, { httpOnly: true, secure: false, sameSite: "lax", maxAge: COOKIE_AGE });
        return res.status(201).json({ ...sanitizeUser(user), success: true });
    },
    signin: async (req: Request, res: Response) => {
        const { email, password } = req.body;
        const user = await prisma.user.findUnique({ where: { email } });
        if (!user) {
            return res.status(400).json({ message: "Invalid credentials" });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid credentials" });
        }
        const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET as string, { expiresIn: "7d" });
        const sanitizeUser = (user: any) => {
            const { email, userId } = user;
            return { email, userId };
        };
        res.cookie("user", sanitizeUser(user), { httpOnly: true, secure: false, sameSite: "lax", maxAge: COOKIE_AGE });
        res.cookie("token", token, { httpOnly: true, secure: false, sameSite: "lax", maxAge: COOKIE_AGE });
        return res.status(200).json({ ...user, success: true });
    },
    logout: async (req: Request, res: Response) => {
        res.clearCookie("user");
        res.clearCookie("token");
        return res.status(200).json({ message: "Logged out successfully" });
    },
    me: async (req: Request, res: Response) => {
        const user = req.user;
        if (!user) {
            return res.status(401).json({ message: "Unauthorized" });
        }
        return res.status(200).json({ ...user, success: true });
    },
};
