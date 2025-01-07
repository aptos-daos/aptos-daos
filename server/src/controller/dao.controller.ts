import { Request, Response } from "express";
import { DAODataSchema } from "../validations/dao.validation";
import prisma from "../libs/prisma";

export class DAOController {
  async createDAO(req: Request, res: Response) {
    try {
      // TODO: UPDATE USER DATA
      const daoData = DAODataSchema.parse(req.body);
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

  async deleteDAOs(req: Request, res: Response) {
    try {
      if (!req.body || !req.body.ids) {
        const deletedEntries = await prisma.dAO.deleteMany();
        res.status(200).json({
          message: `All DAOs deleted successfully. Total deleted: ${deletedEntries.count}`,
        });
        return;
      }

      const { ids } = req.body;

      if (!Array.isArray(ids)) {
        res.status(400).json({
          error: "Invalid input: expected an array of DAO IDs",
        });
        return;
      }

      const deletedEntries = await prisma.dAO.deleteMany({
        where: {
          id: {
            in: ids,
          },
        },
      });

      res.status(200).json({
        message: `${deletedEntries.count} DAOs deleted successfully`,
      });
    } catch (error) {
      res.status(500).json({ error });
    }
  }

  async updateDAO(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const daoData = DAODataSchema.innerType().innerType().partial().parse(req.body);

      const data = await prisma.dAO.update({
        where: { id },
        data: daoData,
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
