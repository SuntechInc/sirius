'use client'

import { Button } from '@/components/ui/button'
import type { Company } from '@/types/company'
import { Plus } from 'lucide-react'
import { useState } from 'react'
import { toast } from 'sonner'
import { CompanyModal } from './company-modal'
import { CompanyTable } from './company-table'

// Dados mock para demonstração
const mockCompanies: Company[] = [
  {
    id: '1',
    razaoSocial: 'Tech Solutions Ltda',
    nomeFantasia: 'TechSol',
    cnpj: '12.345.678/0001-90',
    status: 'ativa',
    dataCriacao: '2023-01-15',
    setor: 'tecnologia',
    segmento: 'software',
    endereco: 'Rua das Flores, 123 - São Paulo/SP',
    email: 'contato@techsol.com.br',
    telefone: '(11) 99999-9999',
  },
  {
    id: '2',
    razaoSocial: 'Indústria Metalúrgica ABC S.A.',
    nomeFantasia: 'MetalABC',
    cnpj: '98.765.432/0001-10',
    status: 'ativa',
    dataCriacao: '2022-08-20',
    setor: 'industrial',
    segmento: 'metalurgia',
    endereco: 'Av. Industrial, 456 - Guarulhos/SP',
    email: 'contato@metalabc.com.br',
    telefone: '(11) 88888-8888',
  },
  {
    id: '3',
    razaoSocial: 'Comércio de Alimentos XYZ Ltda',
    nomeFantasia: 'AlimentosXYZ',
    cnpj: '11.222.333/0001-44',
    status: 'inativa',
    dataCriacao: '2021-03-10',
    setor: 'comercio',
    segmento: 'alimenticio',
    endereco: 'Rua do Comércio, 789 - Rio de Janeiro/RJ',
    email: 'contato@alimentosxyz.com.br',
    telefone: '(21) 77777-7777',
  },
]

export function CompanyManagement() {
  const [companies, setCompanies] = useState<Company[]>(mockCompanies)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingCompany, setEditingCompany] = useState<Company | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  const handleAddCompany = () => {
    setEditingCompany(null)
    setIsModalOpen(true)
  }

  const handleEditCompany = (company: Company) => {
    setEditingCompany(company)
    setIsModalOpen(true)
  }

  const handleDeleteCompany = async (id: string) => {
    setIsLoading(true)
    // Simular delay da API
    await new Promise(resolve => setTimeout(resolve, 1000))

    setCompanies(prev => prev.filter(company => company.id !== id))
    setIsLoading(false)

    toast.success('Empresa excluída', {
      description: 'A empresa foi excluída com sucesso.',
    })
  }

  const handleSaveCompany = async (
    companyData: Omit<Company, 'id' | 'dataCriacao'>
  ) => {
    setIsLoading(true)
    // Simular delay da API
    await new Promise(resolve => setTimeout(resolve, 1500))

    if (editingCompany) {
      // Editar empresa existente
      setCompanies(prev =>
        prev.map(company =>
          company.id === editingCompany.id
            ? { ...company, ...companyData }
            : company
        )
      )
      toast.success('Empresa atualizada', {
        description: 'Os dados da empresa foram atualizados com sucesso.',
      })
    } else {
      // Adicionar nova empresa
      const newCompany: Company = {
        ...companyData,
        id: Date.now().toString(),
        dataCriacao: new Date().toISOString().split('T')[0],
      }
      setCompanies(prev => [...prev, newCompany])
      toast('Empresa criada', {
        description: 'A nova empresa foi criada com sucesso.',
      })
    }

    setIsLoading(false)
    setIsModalOpen(false)
    setEditingCompany(null)
  }

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Gestão de Empresas</h1>
        <Button
          onClick={handleAddCompany}
          className="bg-blue-600 hover:bg-blue-700"
        >
          <Plus className="mr-2 h-4 w-4" />
          Adicionar Empresa
        </Button>
      </div>

      <CompanyTable
        companies={companies}
        onEdit={handleEditCompany}
        onDelete={handleDeleteCompany}
        isLoading={isLoading}
      />

      <CompanyModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false)
          setEditingCompany(null)
        }}
        onSave={handleSaveCompany}
        company={editingCompany}
        isLoading={isLoading}
      />
    </div>
  )
}
