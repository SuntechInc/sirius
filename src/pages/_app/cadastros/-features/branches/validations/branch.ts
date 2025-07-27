import { BranchStatus } from "@/types/enum";
import z from "zod";

export const createBranchSchema = z.object({
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
  code: z
    .string()
    .transform((value) => value?.trim() || "")
    .optional(),
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
  responsible: z
    .string()
    .transform((value) => value?.trim() || "")
    .optional()
    .or(z.literal("")),
  isHeadquarter: z.boolean().optional(),
  status: z.nativeEnum(BranchStatus),
  companyId: z.string().min(1, "Company ID is required"),
});

export type CreateBranchFormData = z.infer<typeof createBranchSchema>;
