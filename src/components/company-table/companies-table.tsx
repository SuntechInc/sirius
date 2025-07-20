"use client"

import { useState, useEffect } from "react"
import { DataTable } from "@/components/data-table"
import { columns } from "./columns"
import { CompanyModulesModal } from "@/components/company-modules-modal"
import type { Company } from "@/lib/queries/company"

interface TenantModule {
  companyId: string
  moduleId: string
  segment: string
  status: "ENABLED" | "DISABLED"
  enabledAt: string
  disabledAt?: string
}

interface CompaniesTableProps {
  data: Company[]
}

export function CompaniesTable({ data }: CompaniesTableProps) {
  const [selectedCompany, setSelectedCompany] = useState<Company | null>(null)
  const [isModulesModalOpen, setIsModulesModalOpen] = useState(false)

  const handleManageModules = (company: Company) => {
    setSelectedCompany(company)
    setIsModulesModalOpen(true)
  }

  const handleSaveModules = async (companyId: string, modules: TenantModule[]) => {
    // Implement API call to save modules
    console.log("Saving modules for company:", companyId, modules)

    // Example API call:
    // await fetch(`/api/companies/${companyId}/modules`, {
    //   method: 'PUT',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify({ modules })
    // })
  }

  useEffect(() => {
    const handleManageModulesEvent = (event: CustomEvent) => {
      handleManageModules(event.detail)
    }

    window.addEventListener('manageModules', handleManageModulesEvent as EventListener)

    return () => {
      window.removeEventListener('manageModules', handleManageModulesEvent as EventListener)
    }
  }, [])

  return (
    <>
      <DataTable columns={columns} data={data} />
      
      <CompanyModulesModal
        company={selectedCompany}
        isOpen={isModulesModalOpen}
        onClose={() => {
          setIsModulesModalOpen(false)
          setSelectedCompany(null)
        }}
        onSave={handleSaveModules}
      />
    </>
  )
} 