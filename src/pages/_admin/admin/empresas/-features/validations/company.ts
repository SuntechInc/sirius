import { CompanyStatus, Industry, Segment } from "@/types/enum";
import z from "zod";

export const createCompanySchema = z.object({
  taxId: z
    .string()
    .min(1, "Tax ID is required")
    .min(3, "Tax ID must be at least 11 characters long")
    .transform((value) => value?.replace(/[^\d]/g, "") || ""),
  tradingName: z
    .string()
    .min(1, "Trading name is required")
    .min(3, "Trading name must be at least 3 characters long")
    .transform((value) => value?.trim() || ""),
  legalName: z
    .string()
    .min(1, "Legal name is required")
    .min(3, "Legal name must be at least 3 characters long")
    .transform((value) => value?.trim() || ""),
  email: z
    .string()
    .email("Invalid email format")
    .transform((value) => value?.toLowerCase().trim() || "")
    .optional()
    .or(z.literal("")),
  phone: z
    .string()
    .min(10, "Phone number must be at least 10 characters long")
    .regex(
      /^[0-9+\-() ]+$/,
      "Phone number can only contain numbers, +, -, () and spaces",
    )
    .transform((value) => value?.trim() || "")
    .optional()
    .or(z.literal("")),
  isBaseCompany: z.boolean(),
  status: z.nativeEnum(CompanyStatus),
  segment: z.nativeEnum(Segment),
  industry: z.nativeEnum(Industry),
});

export type CompanySchema = z.infer<typeof createCompanySchema>;
