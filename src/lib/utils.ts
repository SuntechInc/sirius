import { BranchStatus } from "@/types/enum";
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
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
