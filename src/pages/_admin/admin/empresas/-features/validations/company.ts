import { CompanyStatus, Industry, Segment } from "@/types/enum";
import z from "zod";

export const createCompanySchema = z.object({
  tradingName: z
    .string()
    .min(3, "Trading name must be at least 3 characters long")
    .transform((value) => value?.trim()),
  legalName: z
    .string()
    .min(3, "Legal name must be at least 3 characters long")
    .min(1, "Legal name is required")
    .transform((value) => value?.trim()),
  taxId: z
    .string()
    .min(11, "Tax ID must be at least 11 characters long")
    .min(1, "Tax ID is required")
    .transform((value) => value?.replace(/[^\d]/g, "")), // Remove non-numeric characters
  taxCountry: z
    .string()
    .optional()
    .transform((value) => value?.toUpperCase() || "BR"),
  email: z
    .string()
    .email("Invalid email format")
    .min(1, "Email is required")
    .transform((value) => value?.toLowerCase().trim()),
  phone: z
    .string()
    .min(10, "Phone number must be at least 10 characters long")
    .regex(/^[0-9+\-() ]+$/, {
      message: "Phone number can only contain numbers, +, -, () and spaces",
    })
    .transform((value) => value?.trim())
    .optional(),
  industry: z.nativeEnum(Industry, { message: "Invalid industry" }),
  segment: z.nativeEnum(Segment, { message: "Invalid segment" }),
  status: z
    .nativeEnum(CompanyStatus, { message: "Invalid company status" })
    .default(CompanyStatus.ACTIVE),
});

export type CompanySchema = z.input<typeof createCompanySchema>;
