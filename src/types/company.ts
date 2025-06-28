export interface Company {
  id: string
  razaoSocial: string
  nomeFantasia: string
  cnpj: string
  status: 'ativa' | 'inativa'
  dataCriacao: string
  setor: string
  segmento: string
  endereco: string
  email: string
  telefone: string
}
