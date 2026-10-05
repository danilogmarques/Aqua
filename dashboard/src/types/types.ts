export type CustomerStatus = 'Active' | 'Inactive' | 'Pending';

export type FaturaStatus = 'Paga' | 'Pendente' | 'Atrasada';

export interface Fatura {
  id: string;
  consumer: string;
  unitCode: string;
  reference: string;
  consumptionM3: number;
  dueDate: string;
  amount: number;
  status: FaturaStatus;
}

export interface Customer {
  id: string; 
  name: string;
  phone: string;
  lastService: string;
  status: CustomerStatus;
  actions: string[]; 
}

export type WorkOrderStatus = 'Agendada' | 'Em andamento' | 'Concluída';

export interface WorkOrder {
  id: string;
  customer: string;
  phone: string;
  service: string;
  description: string;
  address: string;
  scheduledAt: string;
  status: WorkOrderStatus;
  createdAt: string;
}

export interface Service {
  id: string;
  name: string;
  category: string;
  price: number;
  status: 'Available' | 'Unavailable';
}

export interface AnalyticsData {
  mes: string;
  acessos: number;
  conversoes: number;
}
