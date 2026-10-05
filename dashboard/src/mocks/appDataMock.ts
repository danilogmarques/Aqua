import type { AnalyticsData, Customer, Service } from '../types/types';

export const MOCK_CUSTOMERS: Customer[] = [
  { id: 'cli-101', name: 'João Silva · UC 008421', phone: '(11) 99912-3401', lastService: 'Ligação de água', status: 'Active', actions: [] },
  { id: 'cli-102', name: 'Maria Oliveira · UC 008422', phone: '(11) 99876-2310', lastService: 'Verificação de hidrômetro', status: 'Pending', actions: [] },
  { id: 'cli-103', name: 'Condomínio Parque das Águas', phone: '(11) 4002-8922', lastService: 'Desobstrução de rede de esgoto', status: 'Active', actions: [] },
  { id: 'cli-104', name: 'Carlos Souza · UC 008424', phone: '(11) 99771-0456', lastService: 'Reparo de vazamento', status: 'Inactive', actions: [] },
];

export const MOCK_SERVICES: Service[] = [
  { id: 'srv-101', name: 'Ligação de água', category: 'Abastecimento', price: 850, status: 'Available' },
  { id: 'srv-102', name: 'Verificação de hidrômetro', category: 'Medição', price: 120, status: 'Available' },
  { id: 'srv-103', name: 'Desobstrução de rede de esgoto', category: 'Esgotamento sanitário', price: 420, status: 'Available' },
  { id: 'srv-104', name: 'Reparo de vazamento na rede', category: 'Manutenção', price: 280, status: 'Unavailable' },
];

export const MOCK_ANALYTICS: AnalyticsData[] = [
  { mes: 'Abr', acessos: 28, conversoes: 12 },
  { mes: 'Mai', acessos: 34, conversoes: 17 },
  { mes: 'Jun', acessos: 31, conversoes: 14 },
  { mes: 'Jul', acessos: 42, conversoes: 21 },
  { mes: 'Ago', acessos: 38, conversoes: 19 },
  { mes: 'Set', acessos: 49, conversoes: 27 },
];