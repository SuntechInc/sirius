import type { BranchStatus } from "./enum";

export type Branch = {
  id: string;
  taxId: string;
  tradingName: string;
  legalName: string;
  code: string;
  email: string;
  phone: string;
  responsible: string;
  isHeadquarter: boolean;
  status: BranchStatus;
  companyId: string;
  addressId: string;
  createdAt: Date;
  updatedAt: Date;
};
