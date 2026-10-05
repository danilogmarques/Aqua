import { useAsyncData } from "@/hooks/useAsyncData";
import { dataService } from "@/services/dataService";
import { Recharts } from "../components/Recharts";
import { CardTest } from "../components/CardInfo";

const loadDashboard = async () => {
  const [customers, services, analytics] = await Promise.all([
    dataService.listCustomers(), dataService.listServices(), dataService.listAnalytics(),
  ]);
  return { customers, services, analytics };
};

export function Dashboard() { 
  const { data, loading, error } = useAsyncData(loadDashboard, { customers: [], services: [], analytics: [] });
  const requests = data.analytics.reduce((total, month) => total + month.acessos, 0);
  const completed = data.analytics.reduce((total, month) => total + month.conversoes, 0);
  return (
    <div className="page-shell">
      <header className="page-heading">
        <div><p className="eyebrow">VISÃO GERAL</p><h1>Dashboard</h1>
        <p className="text-muted-foreground">Acompanhe solicitações, serviços e equipes de campo.</p></div>
      </header>
      {error && <p className="page-error" role="alert">{error}</p>}
      <section className="dashboard-metrics">
        <CardTest title="Unidades atendidas" value={loading ? 0 : data.customers.length} />
        <CardTest title="Serviços disponíveis" value={loading ? 0 : data.services.filter((service) => service.status === 'Available').length} />
        <CardTest title="Solicitações no semestre" value={loading ? 0 : requests} />
        <CardTest title="Atendimentos concluídos" value={loading ? 0 : completed} />
      </section>
      <main className="dashboard-chart">
        <Recharts data={data.analytics} />
      </main>
    </div>
  );
}
