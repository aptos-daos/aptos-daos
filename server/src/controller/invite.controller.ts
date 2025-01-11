import { Request, Response } from "express";
import prisma from "../libs/prisma";
import { Role } from "@prisma/client";
import { addDays } from "date-fns";
import { generateInviteCode } from "../utils/invite-code";

const DEFAULT_EXPIRY_DAYS = 90;

export class InviteController {
  constructor() {}

  async createInvite(req: Request, res: Response): Promise<void> {
    try {
      // TODO: Implement User ID and Wallet Address
      const userId = req.user?.id;

      const user = await prisma.user.findUnique({
        where: { id: userId },
      });

      if (user?.role !== Role.ADMIN) {
        res.status(403).json({
          error: "Only admins can create invite codes",
        });
        return;
      }

      // Create invite code
      const invite = await prisma.inviteCode.create({
        data: {
          code: generateInviteCode(),
          expiresAt: addDays(new Date(), DEFAULT_EXPIRY_DAYS),
          userId,
        },
      });

      res.status(201).json({
        message: "Invite created successfully",
        data: invite,
      });
    } catch (error: any) {
      res.status(500).json({
        message: error,
      });
    }
  }

  async getInvite(req: Request, res: Response): Promise<void> {
    try {
      const { code } = req.params;

      const invite = await prisma.inviteCode.findUnique({
        where: { code },
        include: {
          user: {
            select: {
              id: true,
              walletAddress: true,
            },
          },
        },
      });

      if (!invite) {
        res.status(404).json({
          message: "Invite not found",
        });
        return;
      }

      // Check if invite has expired
      if (invite.expiresAt < new Date()) {
        res.status(400).json({
          message: "Invite has expired",
        });
        return;
      }

      res.status(200).json({
        success: true,
        message: "Invite details retrieved successfully",
        data: invite,
      });
    } catch (error: any) {
      res.status(500).json({
        error: error.message,
      });
    }
  }

  async validateInvite(req: Request, res: Response): Promise<void> {
    try {
      const { code } = req.body;

      if (!code) {
        res.status(400).json({
          error: "Invite code is required",
        });
        return;
      }

      const invite = await prisma.inviteCode.findUnique({
        where: { code },
      });

      if (!invite) {
        res.status(404).json({
          message: "Invalid invite code",
        });
        return;
      }

      if (invite.expiresAt < new Date()) {
        res.status(400).json({
          message: "Invite code has expired",
        });
        return;
      }

      res.status(200).json({
        success: true,
        message: "Invite code is valid",
      });
    } catch (error: any) {
      res.status(500).json({
        error: error.message,
      });
    }
  }
}
