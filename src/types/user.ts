export enum UserType {
  GLOBAL_ADMIN = "GLOBAL_ADMIN",
  COMPANY_ADMIN = "COMPANY_ADMIN",
  EMPLOYEE = "EMPLOYEE",
}

export type User = {
  id: string;
  email: string;
  userType: UserType;
  companyId: string;
  actionCompanyId: string;
};
