import { createFileRoute } from "@tanstack/react-router";
import { MoreHorizontal } from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Ciclo Maturidade 2026 — Diretoria de Pessoas" },
      {
        name: "description",
        content:
          "Painel de controle do Ciclo de Maturidade 2026: distribuição de headcounts, curvas, categorias e eventos.",
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
    <div className="min-h-screen bg-[oklch(0.985_0_0)] font-sans text-zinc-900 antialiased">
      <SiteHeader />

      <main className="mx-auto max-w-[1400px] px-6 py-8">
        <Hero />
        <KpiGrid />
        <AnalysisGrid />
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
      <div className="mx-auto flex h-16 max-w-[1400px] items-center justify-between px-6">
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
    <section className="mb-6 flex items-end justify-between gap-6">
      <div>
        <p className="mb-1.5 font-mono text-[10px] uppercase tracking-[0.2em] text-brand">
          Dashboard de Controle
        </p>
        <h1 className="text-balance text-3xl font-semibold tracking-tight text-zinc-950">
          Bem-vindo ao Ciclo 2026
        </h1>
        <p className="mt-1 text-sm text-zinc-500">
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
        "group relative overflow-hidden rounded-2xl border bg-white p-5 transition-colors " +
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
          "mt-4 text-3xl font-bold tracking-tight " +
          (placeholder ? "text-zinc-300" : "text-zinc-950")
        }
      >
        {value}
      </p>
      {typeof progress === "number" ? (
        <div className="mt-3 h-1.5 w-full overflow-hidden rounded-full bg-zinc-100">
          <div
            className="h-full rounded-full bg-brand transition-all"
            style={{ width: `${progress}%` }}
          />
        </div>
      ) : (
        <div className="mt-3 min-h-[18px] text-[11px] text-zinc-500">{hint}</div>
      )}
    </div>
  );
}

function KpiGrid() {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      <KpiCard
        label="Total de Unidades"
        value="42"
        hint={<span className="text-zinc-500">Unidades no ciclo 2026</span>}
      />
      <KpiCard
        label="Total de Empregados"
        value="1.284"
        hint={<span className="text-zinc-500">Participantes do ciclo 2026</span>}
      />
      <KpiCard label="% Empregados Avaliados" value="72%" progress={72} />
      <KpiCard label="TBD" value="—" hint="Indicador em definição" placeholder />
    </div>
  );
}

/* ---------- Análises (estilo planilha de referência) ---------- */

function AnalysisGrid() {
  return (
    <section className="mt-6 grid grid-cols-1 gap-4 lg:grid-cols-2">
      <HeadcountsCard />
      <CurvasCard />
      <CategoriasCard />
      <EventosCard />
    </section>
  );
}

function AnalysisShell({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-2xl border border-zinc-200/80 bg-white p-6 shadow-[0_1px_2px_rgba(0,0,0,0.02)]">
      <h3 className="mb-5 text-center text-base font-bold text-brand">{title}</h3>
      {children}
    </div>
  );
}

function HeadcountsCard() {
  const rows = [
    ["Junior", 1, 1, 0],
    ["Pleno", 9, 9, 0],
    ["Senior", 5, 5, 0],
    ["Master", 0, 0, 0],
    ["Expert", 0, 0, 0],
  ] as const;
  return (
    <AnalysisShell title="Distribuição headcounts">
      <table className="w-full text-sm">
        <thead>
          <tr className="text-zinc-500">
            <th className="py-2 text-left font-medium">Empregados</th>
            <th className="py-2 text-right font-medium">Atual</th>
            <th className="py-2 text-right font-medium">Simulado</th>
            <th className="py-2 text-right font-medium">
              <span className="block">(*)</span>
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-zinc-100">
          {rows.map(([nome, atual, sim, ast]) => (
            <tr key={nome}>
              <td className="py-2 text-zinc-700">{nome}</td>
              <td className="py-2 text-right font-semibold tabular-nums text-zinc-900">{atual}</td>
              <td className="py-2 text-right font-semibold tabular-nums text-zinc-900">{sim}</td>
              <td className="py-2 text-right font-semibold tabular-nums text-zinc-400">{ast}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <p className="mt-3 text-[11px] text-brand">(*) Aguardando análise</p>
    </AnalysisShell>
  );
}

function CurvasCard() {
  const rows = [
    ["Junior", "7%", "7%"],
    ["Pleno", "60%", "60%"],
    ["Senior", "33%", "33%"],
    ["Master", "0%", "0%"],
    ["Expert", "0%", "0%"],
  ] as const;
  return (
    <AnalysisShell title="Distribuição curvas (%)">
      <table className="w-full text-sm">
        <thead>
          <tr className="text-zinc-500">
            <th className="py-2 text-left font-medium"> </th>
            <th className="py-2 text-right font-medium">Atual</th>
            <th className="py-2 text-right font-medium">Simulado</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-zinc-100">
          {rows.map(([nome, atual, sim]) => (
            <tr key={nome}>
              <td className="py-2 text-zinc-700">{nome}</td>
              <td className="py-2 text-right font-semibold tabular-nums text-zinc-900">{atual}</td>
              <td className="py-2 text-right font-semibold tabular-nums text-zinc-900">{sim}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </AnalysisShell>
  );
}

function CategoriasCard() {
  const rows = [
    ["Nível Superior", 15],
    ["Supervisor", 0],
  ] as const;
  return (
    <AnalysisShell title="Categorias">
      <table className="w-full text-sm">
        <tbody className="divide-y divide-zinc-100">
          {rows.map(([nome, v]) => (
            <tr key={nome}>
              <td className="py-2 text-zinc-700">{nome}</td>
              <td className="py-2 text-right font-semibold tabular-nums text-zinc-900">{v}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </AnalysisShell>
  );
}

function EventosCard() {
  const rows = [
    ["Promovidos", 1],
    ["Rebaixados", 1],
    ["Em análise", 0],
    ["Inalterados", 13],
  ] as const;
  return (
    <AnalysisShell title="Eventos">
      <table className="w-full text-sm">
        <tbody className="divide-y divide-zinc-100">
          {rows.map(([nome, v]) => (
            <tr key={nome}>
              <td className="py-2 text-zinc-700">{nome}</td>
              <td className="py-2 text-right font-semibold tabular-nums text-zinc-900">{v}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </AnalysisShell>
  );
}

function Footer() {
  return (
    <footer className="mt-10 border-t border-zinc-200/70 pt-6">
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
