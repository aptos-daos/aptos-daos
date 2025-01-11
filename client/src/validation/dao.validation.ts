import { z } from "zod";

const dateSchema = z
  .union([
    z.date(), // Accepts Date objects
    z.string().refine((str) => !isNaN(Date.parse(str)), {
      message: "Invalid date string format",
    }),
  ])
  .transform((value) => {
    if (typeof value === "string") {
      return new Date(value); // Parse string into Date
    }
    return value;
  });

const daoSchema = z.object({
  id: z.string().cuid(),
  walletAddress: z.string(),
  poster: z.string(),
  title: z.string().min(3).max(50, "Title max word limit is 50"),
  bio: z
    .string()
    .min(1, "Bio is required")
    .max(500, "Bio must be less than 500 characters"),
  treasuryAddress: z.string(),
  daoCoinAddress: z.string(),

  fundingStarts: dateSchema.optional().default(new Date()),
  fundingEnds: dateSchema.optional(),

  tradingStartsAt: dateSchema.optional(),
  tradingEndsAt: dateSchema.optional(),

  createdAt: z.date().default(() => new Date()),
  userId: z.string().cuid(),
});

export type DaoData = z.infer<typeof daoSchema>;

export const DAODataSchema = daoSchema;
