import type { CompanyStatus, Industry, Segment } from "./enum";

export type Company = {
  id: string;
  tradingName: string;
  legalName: string;
  taxId: string;
  taxCountry: string;
  email: string;
  phone: string;
  industry: Industry;
  segment: Segment;
  status: CompanyStatus;
  isBaseCompany: boolean;
  createdAt: Date;
  updatedAt: Date;
};
