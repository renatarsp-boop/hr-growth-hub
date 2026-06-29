import { createFileRoute } from "@tanstack/react-router";
import { ArrowRight, ArrowDown, MoreHorizontal } from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Ciclo Maturidade 2026 — Diretoria de Pessoas" },
      {
        name: "description",
        content:
          "Painel de controle do Ciclo de Maturidade 2026: acompanhamento de empregados avaliados e indicadores da Diretoria de Pessoas.",
      },
      { property: "og:title", content: "Ciclo Maturidade 2026" },
      {
        property: "og:description",
        content: "Painel de controle do Ciclo de Maturidade 2026.",
      },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <div className="min-h-screen bg-[oklch(0.985_0_0)] font-sans text-zinc-900 antialiased selection:bg-indigo/10">
      <SiteHeader />

      <main className="mx-auto max-w-7xl px-6 py-12">
        <Hero />
        <KpiGrid />

        <div className="mt-10 grid grid-cols-1 gap-8 lg:grid-cols-12">
          <div className="space-y-8 lg:col-span-8">
            <CycleProgress />
            <ActivityFeed />
          </div>
          <aside className="space-y-6 lg:col-span-4">
            <QuickActions />
            <InsightCard />
          </aside>
        </div>

        <Footer />
      </main>
    </div>
  );
}

function SiteHeader() {
  const links = [
    { label: "Início", active: true },
    { label: "RH - Administração", active: false },
    { label: "Ciclo Maturidade", active: false },
    { label: "Relatórios", active: false },
  ];
  return (
    <header className="sticky top-0 z-50 border-b border-zinc-200/70 bg-white/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        <div className="flex items-center gap-8">
          <a href="/" className="flex items-center gap-2.5">
            <span className="grid size-8 place-items-center rounded-lg bg-indigo shadow-sm shadow-indigo/30">
              <span className="size-3.5 rounded-full border-2 border-white" />
            </span>
            <span className="text-[15px] font-semibold tracking-tight">Ciclo Maturidade</span>
          </a>
          <nav className="hidden items-center gap-1 md:flex">
            {links.map((l) => (
              <a
                key={l.label}
                href="#"
                className={
                  l.active
                    ? "rounded-full bg-indigo-soft px-4 py-2 text-sm font-medium text-indigo"
                    : "rounded-full px-4 py-2 text-sm font-medium text-zinc-500 transition-colors hover:text-zinc-900"
                }
              >
                {l.label}
              </a>
            ))}
          </nav>
        </div>
        <div className="flex items-center gap-4">
          <div className="hidden flex-col items-end leading-tight sm:flex">
            <span className="text-xs font-semibold text-zinc-900">Ana Beatriz</span>
            <span className="text-[11px] text-zinc-400">HR Lead Analyst</span>
          </div>
          <div
            aria-label="Avatar"
            className="size-9 rounded-full bg-gradient-to-br from-zinc-200 to-zinc-300 ring-1 ring-black/5"
          />
        </div>
      </div>
    </header>
  );
}

function Hero() {
  return (
    <section className="mb-10 flex items-end justify-between gap-6">
      <div>
        <p className="mb-2 font-mono text-[10px] uppercase tracking-[0.2em] text-brand">
          Dashboard de Controle
        </p>
        <h1 className="text-balance text-4xl font-semibold tracking-tight text-zinc-950">
          Bem-vindo ao Ciclo 2026
        </h1>
        <p className="mt-2 text-sm text-zinc-500">
          Gestão de Maturidade de Empregados — Diretoria de Pessoas
        </p>
      </div>
      <div className="hidden text-right md:block">
        <span className="block font-mono text-2xl font-light text-zinc-900">14:02</span>
        <span className="text-[10px] uppercase tracking-widest text-zinc-400">
          GMT-3 São Paulo
        </span>
      </div>
    </section>
  );
}

type KpiProps = {
  label: string;
  value: string;
  hint?: React.ReactNode;
  progress?: number;
  placeholder?: boolean;
};

function KpiCard({ label, value, hint, progress, placeholder }: KpiProps) {
  return (
    <div
      className={
        "group relative overflow-hidden rounded-2xl border bg-white p-6 transition-colors " +
        (placeholder
          ? "border-dashed border-zinc-200"
          : "border-zinc-200/80 hover:border-brand/40")
      }
    >
      <div className="flex items-center justify-between">
        <p className="font-mono text-[10px] uppercase tracking-widest text-zinc-400">{label}</p>
        {placeholder ? <MoreHorizontal className="size-4 text-zinc-300" /> : null}
      </div>
      <p
        className={
          "mt-5 text-3xl font-bold tracking-tight " +
          (placeholder ? "text-zinc-300" : "text-zinc-950")
        }
      >
        {value}
      </p>
      {typeof progress === "number" ? (
        <div className="mt-4 h-1.5 w-full overflow-hidden rounded-full bg-zinc-100">
          <div
            className="h-full rounded-full bg-brand transition-all"
            style={{ width: `${progress}%` }}
          />
        </div>
      ) : (
        <div className="mt-4 min-h-[18px] text-[11px] text-zinc-500">{hint}</div>
      )}
    </div>
  );
}

function KpiGrid() {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      <KpiCard
        label="Total Empregados no Processo"
        value="1.284"
        hint={<span className="text-zinc-500">Participantes do ciclo 2026</span>}
      />
      <KpiCard
        label="% Empregados Avaliados"
        value="72%"
        progress={72}
      />
      <KpiCard label="TBD" value="—" hint="Indicador em definição" placeholder />
      <KpiCard label="TBD" value="—" hint="Indicador em definição" placeholder />
    </div>
  );
}

function CycleProgress() {
  const stages = [
    { n: "01", label: "Alinhamento", state: "done" as const },
    { n: "02", label: "Avaliação 360", state: "done" as const },
    { n: "03", label: "Consolidação", state: "active" as const },
    { n: "04", label: "Feedback", state: "todo" as const },
  ];
  return (
    <section className="rounded-2xl border border-zinc-200/80 bg-white p-8">
      <div className="mb-10 flex items-center justify-between">
        <h2 className="text-xs font-bold uppercase tracking-widest text-zinc-900">
          Progresso do Ciclo Atual
        </h2>
        <span className="font-mono text-xs text-zinc-400">Etapa 3 de 4</span>
      </div>
      <div className="relative flex justify-between">
        <div className="absolute left-0 top-5 h-px w-full bg-zinc-100" />
        <div className="absolute left-0 top-5 h-px w-[66%] bg-brand" />
        {stages.map((s) => {
          const base =
            "relative z-10 grid size-10 place-items-center rounded-full text-xs font-bold";
          const style =
            s.state === "done"
              ? "border-2 border-brand bg-white text-brand"
              : s.state === "active"
                ? "border-2 border-brand bg-brand text-white shadow-md shadow-brand/30"
                : "border border-zinc-200 bg-zinc-50 text-zinc-400";
          const labelStyle =
            s.state === "todo" ? "text-zinc-400" : "text-zinc-900";
          return (
            <div key={s.n} className="relative z-10 flex flex-col items-center gap-3">
              <div className={`${base} ${style}`}>{s.n}</div>
              <span
                className={`text-[10px] font-bold uppercase tracking-wider ${labelStyle}`}
              >
                {s.label}
              </span>
            </div>
          );
        })}
      </div>
    </section>
  );
}

function ActivityFeed() {
  const items = [
    {
      dot: "bg-emerald-500",
      title: "Relatório de Engenharia exportado",
      sub: "Processado por Roberto Silva",
      time: "Hoje, 10:24",
    },
    {
      dot: "bg-brand",
      title: "Nova pendência de avaliação",
      sub: "Setor Comercial — 12 itens em atraso",
      time: "Hoje, 09:15",
    },
    {
      dot: "bg-zinc-300",
      title: "Backup do sistema concluído",
      sub: "Automático — integridade 100%",
      time: "Ontem, 23:00",
    },
  ];
  return (
    <section className="overflow-hidden rounded-2xl border border-zinc-200/80 bg-white">
      <div className="flex items-center justify-between border-b border-zinc-100 px-6 py-4">
        <h2 className="text-xs font-bold uppercase tracking-widest text-zinc-900">
          Feed de Atividades Recentes
        </h2>
        <button className="font-mono text-[10px] text-zinc-400 hover:text-zinc-900">
          Ver tudo
        </button>
      </div>
      <ul className="divide-y divide-zinc-100">
        {items.map((i) => (
          <li
            key={i.title}
            className="flex items-center justify-between px-6 py-4 transition-colors hover:bg-zinc-50"
          >
            <div className="flex items-center gap-4">
              <span className={`size-2 rounded-full ${i.dot}`} />
              <div>
                <p className="text-sm font-medium text-zinc-900">{i.title}</p>
                <p className="text-xs text-zinc-500">{i.sub}</p>
              </div>
            </div>
            <span className="font-mono text-[10px] text-zinc-400">{i.time}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}

function QuickActions() {
  return (
    <div className="rounded-2xl border border-zinc-900 bg-zinc-900 p-6 text-white">
      <h3 className="mb-6 font-mono text-[10px] uppercase tracking-[0.2em] text-white/50">
        Ações Prioritárias
      </h3>
      <div className="grid gap-3">
        <button className="flex items-center justify-between rounded-xl bg-brand px-4 py-3 text-xs font-bold uppercase tracking-wider transition-transform active:scale-[0.98]">
          Iniciar Avaliação
          <ArrowRight className="size-3.5 opacity-80" />
        </button>
        <button className="flex items-center justify-between rounded-xl border border-white/15 px-4 py-3 text-xs font-bold uppercase tracking-wider transition-colors hover:bg-white/10">
          Ver Pendências
          <span className="font-mono text-[10px] text-brand">42</span>
        </button>
        <button className="flex items-center justify-between rounded-xl border border-white/15 px-4 py-3 text-xs font-bold uppercase tracking-wider transition-colors hover:bg-white/10">
          Exportar Relatório
          <ArrowDown className="size-3.5 opacity-80" />
        </button>
      </div>
    </div>
  );
}

function InsightCard() {
  return (
    <div className="rounded-2xl border border-zinc-200/80 bg-white p-6">
      <div className="mb-4 grid aspect-[4/3] w-full place-items-center rounded-xl bg-gradient-to-br from-brand-soft via-white to-indigo-soft ring-1 ring-black/5">
        <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-zinc-400">
          Insight do Ciclo
        </span>
      </div>
      <h4 className="mb-2 text-sm font-bold text-zinc-900">Otimização de Tempo</h4>
      <p className="text-xs leading-relaxed text-zinc-500">
        Analistas que utilizam a exportação automatizada economizam em média 4h semanais de
        tabulação manual.
      </p>
    </div>
  );
}

function Footer() {
  return (
    <footer className="mt-16 border-t border-zinc-200/70 pt-8">
      <div className="flex flex-col items-center justify-between gap-4 text-zinc-400 md:flex-row">
        <div className="flex items-center gap-2">
          <span className="size-3 rounded-sm bg-zinc-900" />
          <span className="font-mono text-[10px] uppercase tracking-widest">
            Portal de Governança RH
          </span>
        </div>
        <p className="font-mono text-[10px] uppercase tracking-widest">
          © 2026 Diretoria de Pessoas
        </p>
        <div className="flex gap-6">
          <span className="font-mono text-[10px] uppercase">v4.0.2</span>
          <a href="#" className="font-mono text-[10px] uppercase hover:text-zinc-900">
            Privacidade
          </a>
        </div>
      </div>
    </footer>
  );
}
