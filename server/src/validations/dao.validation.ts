import { z } from "zod";

const daoSchema = z
  .object({
    id: z.string().cuid(),
    founderWalletAddress: z.string(),
    bio: z
      .string()
      .min(1, "Bio is required")
      .max(500, "Bio must be less than 500 characters"),
    treasuryAddress: z.string(),
    daoCoinAddress: z.string(),

    fundingStarts: z.date().nullable().optional(),
    fundingEnds: z.date().nullable().optional(),

    tradingStartsAt: z.date().nullable().optional(),
    tradingEndsAt: z.date().nullable().optional(),

    createdAt: z.date().default(() => new Date()),
    userId: z.string().cuid(),
  })
  .refine(
    (data) => {
      if (data.fundingStarts && data.fundingEnds) {
        return data.fundingStarts < data.fundingEnds;
      }
      return true;
    },
    {
      message: "Funding end date must be after funding start date",
      path: ["fundingEnds"],
    }
  )
  .refine(
    (data) => {
      if (data.tradingStartsAt && data.tradingEndsAt) {
        return data.tradingStartsAt < data.tradingEndsAt;
      }
      return true;
    },
    {
      message: "Trading end date must be after trading start date",
      path: ["tradingEndsAt"],
    }
  );

export const DAODataSchema = daoSchema;