import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'
import { CompanyStatus, Industry, Segment } from '@/types/enums'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

const industryNames = {
  [Industry.AGRIBUSINESS]: 'Agronegócio',
  [Industry.HEALTHCORE]: 'Saúde',
  [Industry.TECHNOLOGY]: 'Tecnologia',
  [Industry.TRANSPORTATION_MOBILITY]: 'Mobilidade De Transporte',
} as const

export function getFormattedIndustry(industry: Industry) {
  return industryNames[industry]
}

const segmentNames = {
  [Segment.ANIMAL_HEALTH]: 'Saúde Animal',
  [Segment.DRIVING_SCHOOL]: 'Autoescola',
  [Segment.HOSPITAL]: 'Hospital',
  [Segment.LABORATORY]: 'Laboratório',
  [Segment.MEDICAL_METALLURGY]: 'Metalurgia Médica',
  [Segment.VEHICLE_INSPECTION]: 'Vistoria Veicular',
  [Segment.VEHICLE_REGISTRATION]: 'Emplacamento de Veículos',
} as const

export function getFormattedSegment(segment: Segment) {
  return segmentNames[segment]
}

const companyStatus = {
  [CompanyStatus.ACTIVE]: 'Ativa',
  [CompanyStatus.CANCELLED]: 'Cancelada',
  [CompanyStatus.CLOSED]: 'Encerrada',
  [CompanyStatus.INACTIVE]: 'Inativa',
  [CompanyStatus.SUSPENDED]: 'Suspensa',
  [CompanyStatus.TRIAL]: 'Período de Testes',
} as const

export function getCompanyStatus(status: CompanyStatus) {
  return companyStatus[status]
}
