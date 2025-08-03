import type { CompanyStatus } from "./enum";

export type Company = {
  id: string;
  legalName: string;
  tradingName: string;
  email: string;
  status: CompanyStatus;
  createdAt: string;
};
