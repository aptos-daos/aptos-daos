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

export const daoFormSchema = z.object({
  title: z
    .string()
    .min(2, "Fund name must be at least 2 characters")
    .max(50, "Fund name must be less than 50 characters"),
  fundTicker: z
    .string()
    .regex(
      /^[A-Z0-9]+$/,
      "Fund ticker must contain only uppercase letters and numbers"
    ),
  description: z
    .string()
    .min(10, "Fund description must be at least 10 characters")
    .max(500, "Fund description must be less than 500 characters"),
  twitterHandle: z
    .string()
    .regex(/^@?(\w){1,15}$/, "Invalid Twitter/X handle format")
    .or(z.literal("")),
  telegramHandle: z
    .string()
    .regex(/^@?(\w){5,32}$/, "Invalid Telegram handle format")
    .or(z.literal("")),
  telegramGroup: z
    .string()
    .regex(/^@?(\w){5,32}$/, "Invalid Telegram group format")
    .optional()
    .or(z.literal("")),
  poc: z.string().min(1, "POC is required"),
});

const daoSchema = daoFormSchema.extend({
  id: z.string().cuid(),
  poster: z.string(),

  treasuryAddress: z.string(),
  daoCoinAddress: z.string(),

  fundingStarts: dateSchema.optional().default(new Date()),
  fundingEnds: dateSchema.optional(),

  tradingStartsAt: dateSchema.optional(),
  tradingEndsAt: dateSchema.optional(),

  createdAt: z.date().default(() => new Date()),
});

export const daoWithInvite = daoFormSchema.extend({
  inviteCode: z.string().min(6, "Invite code must be at least 6 characters"),
});

export type DaoData = z.infer<typeof daoSchema>;
export type DaoDataWithInvite = z.infer<typeof daoWithInvite>;

export const DAODataSchema = daoSchema;
