import { BranchStatus, CompanyStatus } from "@/types/enum";
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const companyStatus = {
  [CompanyStatus.ACTIVE]: "Ativa",
  [CompanyStatus.CANCELLED]: "Cancelada",
  [CompanyStatus.CLOSED]: "Encerrada",
  [CompanyStatus.INACTIVE]: "Inativa",
  [CompanyStatus.SUSPENDED]: "Suspensa",
  [CompanyStatus.TRIAL]: "Período de Testes",
} as const;

export function getCompanyStatus(status: CompanyStatus) {
  return companyStatus[status];
}

const branchStatus = {
  [BranchStatus.ACTIVE]: "Ativa",
  [BranchStatus.INACTIVE]: "Desativada",
  [BranchStatus.OBSOLETE]: "Obsoleta",
  [BranchStatus.SUSPENDED]: "Suspensa",
} as const;

export function getBranchStatus(status: BranchStatus) {
  return branchStatus[status];
}
