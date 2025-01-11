import { Request, Response } from "express";
import { DAODataSchema } from "../validations/dao.validation";
import prisma from "../libs/prisma";

export class DAOController {
  /*
  title,
description,
daoCoinAddress, 
fundingStarts
  */
  async createDAO(req: Request, res: Response) {
    try {
      const daoData = DAODataSchema.parse({
        ...req.body,
        walletAddress: req.body.walletAddress,
      });
      const newDAO = await prisma.dAO.create({
        data: daoData,
      });
      res.status(201).json({ success: true, data: newDAO });
    } catch (error) {
      res.status(400).json({ error });
    }
  }

  async removeDAO(req: Request, res: Response) {
    try {
      const { id } = req.params;
      if (id) {
        await prisma.dAO.delete({
          where: { id },
        });
        res.status(200).json({ message: "DAO removed successfully" });
      }
    } catch (error) {
      res.status(500).json({ error });
    }
  }

  async updateDAO(req: Request, res: Response) {
    try {
      const { id } = req.params;

      const data = await prisma.dAO.update({
        where: { id },
        data: req.body,
      });

      res.status(200).json({ data, message: "DAO Updated Successfully" });
    } catch (error) {
      res.status(500).json({ error });
    }
  }

  async getAllDAOs(_: Request, res: Response) {
    try {
      const data = await prisma.dAO.findMany();
      res.status(200).json({ data });
    } catch (error) {
      res.status(500).json({ error });
    }
  }

  async getSingleDAO(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const dao = await prisma.dAO.findUnique({
        where: { id },
      });

      if (dao) {
        res.status(200).json(dao);
      } else {
        res.status(404).json({ error: "DAO not found" });
      }
    } catch (error) {
      res.status(500).json({ error });
    }
  }
}
