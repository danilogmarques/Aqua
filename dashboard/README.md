# Aqua Gestão

Painel demonstrativo para gestão de unidades atendidas, serviços de água e
esgotamento sanitário e equipes de campo.

## Executar o painel

```sh
cd dashboard
npm install
npm run dev
```

O acesso demonstrativo usa `operador@aquagestao.com.br` e `agua2026`. Essa
autenticação local serve apenas para demonstração e não deve ser usada em
produção.

## Dados e API

Sem `VITE_API_URL`, o painel usa dados demonstrativos em `src/mocks/`. Para
conectar uma API, defina essa variável no ambiente do Vite. O adaptador em
`src/services/dataService.ts` consome:

- `GET /clientes` (unidades atendidas)
- `GET /servicos`
- `GET /relatorios/analytics`

As respostas devem seguir os tipos de `src/types/types.ts`. As ordens de serviço
criadas pelo painel ficam no armazenamento local deste navegador; ainda não há
endpoints para sincronizá-las com a API ou com o aplicativo móvel.

O aplicativo móvel da equipe de campo fica em `../mobile/`. O backend em
Express e PostgreSQL fica em `../backend/`.

A página **Faturas** usa registros ilustrativos locais; emissão, baixa de
pagamento e sincronização com a API ainda não estão implementadas.
