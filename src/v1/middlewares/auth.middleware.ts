import type { Request, Response, NextFunction } from "express";
import { prisma } from "../../lib/prisma";
import jwt from "jsonwebtoken";
declare global {
    namespace Express {
        interface Request {
            user?: {
                userId: string;
                id: string;
                email: string | null;
            };
        }
    }
}
export const authenticate = async (req: Request, res: Response, next: NextFunction) => {
    const bearerToken = req.headers.authorization?.startsWith("Bearer ") ? req.headers.authorization.split(" ")[1] : undefined;
    const token = bearerToken || req.cookies?.token;
    const decoded = jwt.verify(token as string, process.env.JWT_SECRET as string) as { userId: string };
    const user = await prisma.user.findUnique({
        where: { id: decoded.userId },
        select: {
            id: true,
            userName: true,
            email: true,
        },
    });
    if (!user) {
        return res.status(401).json({ message: "Unauthorized" });
    }
    req.user = { ...user, userId: decoded.userId };
    return next();
};
