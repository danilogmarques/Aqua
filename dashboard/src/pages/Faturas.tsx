import { useState } from 'react';
import { Search } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { MOCK_FATURAS } from '@/mocks/faturasMock';
import type { FaturaStatus } from '@/types/types';

type StatusFilter = 'Todas' | FaturaStatus;

const formatCurrency = (value: number) =>
  value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

const formatDate = (value: string) =>
  new Date(`${value}T00:00:00`).toLocaleDateString('pt-BR');

export default function Faturas() {
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<StatusFilter>('Todas');

  const normalizedSearch = search.trim().toLocaleLowerCase('pt-BR');
  const filteredInvoices = MOCK_FATURAS.filter((invoice) => {
    const matchesSearch = `${invoice.id} ${invoice.consumer} ${invoice.unitCode} ${invoice.reference}`
      .toLocaleLowerCase('pt-BR')
      .includes(normalizedSearch);
    return matchesSearch && (statusFilter === 'Todas' || invoice.status === statusFilter);
  });

  const totalIssued = MOCK_FATURAS.reduce((total, invoice) => total + invoice.amount, 0);
  const totalPaid = MOCK_FATURAS
    .filter((invoice) => invoice.status === 'Paga')
    .reduce((total, invoice) => total + invoice.amount, 0);
  const totalOpen = MOCK_FATURAS
    .filter((invoice) => invoice.status !== 'Paga')
    .reduce((total, invoice) => total + invoice.amount, 0);
  const overdueCount = MOCK_FATURAS.filter((invoice) => invoice.status === 'Atrasada').length;

  return (
    <section className="page-shell">
      <header className="page-heading">
        <div>
          <p className="eyebrow">FATURAMENTO DE ÁGUA E ESGOTO</p>
          <h1>Faturas</h1>
          <p className="text-muted-foreground">Consulte valores, consumo e vencimentos por unidade.</p>
        </div>
      </header>

      <section className="invoice-summary" aria-label="Resumo das faturas">
        <article className="summary-item">
          <div><p>Total faturado</p><strong>{formatCurrency(totalIssued)}</strong></div>
        </article>
        <article className="summary-item">
          <div><p>Recebido</p><strong>{formatCurrency(totalPaid)}</strong></div>
        </article>
        <article className="summary-item">
          <div><p>Em aberto</p><strong>{formatCurrency(totalOpen)}</strong></div>
        </article>
        <article className="summary-item">
          <div><p>Faturas atrasadas</p><strong>{overdueCount}</strong></div>
        </article>
      </section>

      <div className="table-toolbar invoice-toolbar">
        <div className="search-field">
          <Search size={17} aria-hidden="true" />
          <Input
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Buscar fatura, unidade ou consumidor"
            aria-label="Buscar faturas"
          />
        </div>
        <label className="invoice-filter">
          <span>Situação</span>
          <select
            value={statusFilter}
            onChange={(event) => setStatusFilter(event.target.value as StatusFilter)}
            aria-label="Filtrar faturas por situação"
          >
            <option value="Todas">Todas</option>
            <option value="Paga">Pagas</option>
            <option value="Pendente">Pendentes</option>
            <option value="Atrasada">Atrasadas</option>
          </select>
        </label>
        <span className="result-count">{filteredInvoices.length} faturas</span>
      </div>

      <div className="data-table-wrap">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Fatura</TableHead>
              <TableHead>Unidade / consumidor</TableHead>
              <TableHead>Referência</TableHead>
              <TableHead>Consumo</TableHead>
              <TableHead>Vencimento</TableHead>
              <TableHead>Valor</TableHead>
              <TableHead>Situação</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredInvoices.map((invoice) => (
              <TableRow key={invoice.id}>
                <TableCell className="font-medium">{invoice.id}</TableCell>
                <TableCell>
                  <span className="invoice-consumer">{invoice.consumer}</span>
                  <span className="invoice-unit">{invoice.unitCode}</span>
                </TableCell>
                <TableCell>{invoice.reference}</TableCell>
                <TableCell>{invoice.consumptionM3} m³</TableCell>
                <TableCell>{formatDate(invoice.dueDate)}</TableCell>
                <TableCell className="font-semibold">{formatCurrency(invoice.amount)}</TableCell>
                <TableCell>
                  <Badge
                    variant="outline"
                    className={
                      invoice.status === 'Paga'
                        ? 'status-approved'
                        : invoice.status === 'Atrasada'
                          ? 'status-overdue'
                          : 'status-pending'
                    }
                  >
                    {invoice.status}
                  </Badge>
                </TableCell>
              </TableRow>
            ))}
            {filteredInvoices.length === 0 && (
              <TableRow>
                <TableCell colSpan={7}>Nenhuma fatura corresponde à busca ou ao filtro.</TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <p className="invoice-note">Dados demonstrativos; as faturas ainda não estão conectadas à API.</p>
    </section>
  );
}
