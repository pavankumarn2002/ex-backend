import { prisma } from "../../lib/prisma";
import Router, { type Request, type Response } from "express";
export interface ChatController {
    getAllUsers: (req: Request, res: Response) => void;
}
export const ChatController: ChatController = {
    getAllUsers: async (req: Request, res: Response) => {
        try {
            const users = await prisma.user.findMany({
                where: req.user?.id
                    ? {
                          id: {
                              not: req.user.id,
                          },
                      }
                    : {},
            });
            res.json(users);
        } catch (error) {
            console.error("Error fetching users:", error);
            res.status(500).json({ error: "Failed to fetch users" });
        }
    },
};
