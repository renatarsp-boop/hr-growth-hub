## Visão geral

Substituir a home placeholder por um dashboard profissional e minimalista do Ciclo Maturidade, combinando o **header da direção 1 (Executivo Suíço)** com o **corpo da direção 3 (Command Center)**, ajustando os KPIs e arredondando os cantos dos cards.

## Design tokens (em `src/styles.css`)

- Fundo: `oklch(0.985 0 0)` (off-white)
- Texto: quase preto + escala de cinzas
- Acento principal: laranja-coral `#f97316` (alinhado ao logo atual)
- Acento secundário: índigo `#6366f1` (nav ativo, como no header escolhido)
- Tipografia: Inter (display + UI) e JetBrains Mono para labels/horário
- Raio padrão dos cards: `rounded-2xl` (cantos bem arredondados, conforme pedido)

## Header (baseado na imagem 1 — MaturityPulse)

- Barra fixa, fundo branco com leve blur, borda inferior sutil
- Esquerda: logo (quadrado índigo com círculo) + nome "Ciclo Maturidade"
- Centro: nav em pílulas — Início (ativo, fundo índigo translúcido), RH - Administração, Ciclo Maturidade, Relatórios
- Direita: nome do usuário ("Ana Beatriz") + cargo ("HR Lead Analyst") + avatar circular

## Hero / saudação

- Eyebrow em mono laranja: "DASHBOARD DE CONTROLE"
- H1: "Bem-vindo ao Ciclo 2026"
- Subtítulo: "Gestão de Maturidade de Empregados — Diretoria de Pessoas"
- Lado direito: hora local + GMT-3 São Paulo (estilo command center)

## KPIs (4 cards, todos com `rounded-2xl`)

```text
[ Total Empregados ] [ % Avaliados ] [ TBD ] [ TBD ]
     1,284                72%          —       —
```

1. **Total Empregados no processo** — número grande, sublabel "no ciclo 2026"
2. **% Empregados avaliados** — número grande com barra de progresso laranja
3. **TBD** — placeholder cinza claro, label "Em definição", ícone neutro
4. **TBD** — idem

Estilo: borda fina, fundo branco, padding generoso, label em mono uppercase, número em peso 700 com tracking apertado, hover sutil na borda.

## Resto da página (mantém composição v3)

- Card "Progresso do Ciclo Atual" com timeline horizontal de 4 etapas
- Card "Feed de Atividades Recentes" (lista com indicadores coloridos)
- Aside direito: bloco escuro "Ações Prioritárias" (Iniciar Avaliação / Ver Pendências / Exportar Relatório) + card de insight
- Footer discreto

## Arquivos

- `src/styles.css` — adicionar tokens de cor/fonte, carregar Inter + JetBrains Mono via `<link>` no `__root.tsx`
- `src/routes/__root.tsx` — adicionar `<link>` das fontes Google; atualizar `<title>` e meta description para "Ciclo Maturidade"
- `src/routes/index.tsx` — substituir o placeholder pelo novo dashboard completo
- `src/components/dashboard/` — componentes auxiliares: `SiteHeader`, `KpiCard`, `CycleTimeline`, `ActivityFeed`, `QuickActions`

## Fora de escopo

- Sem lógica de backend / autenticação / dados reais (tudo estático nesta etapa)
- Sem demais rotas (RH, Ciclo, Relatórios) — apenas links no header
- Sem dark mode