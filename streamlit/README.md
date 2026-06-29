# Ciclo Maturidade — Streamlit

Réplica em Streamlit do dashboard "Ciclo Maturidade — Diretoria de Pessoas".

## Como rodar

```bash
cd streamlit
python -m venv .venv && source .venv/bin/activate
pip install -r requirements.txt
streamlit run app.py
```

Abre em `http://localhost:8501`.

## Estrutura

```
streamlit/
├── app.py                  # entrypoint (st.navigation)
├── pages_/
│   ├── dashboard.py        # tela principal
│   ├── rh_admin.py         # placeholder
│   └── relatorios.py       # placeholder
├── components/
│   ├── header.py           # SiteHeader (logo + nav pílulas + usuário)
│   ├── hero.py             # Hero + hora local
│   ├── kpi.py              # KpiCard
│   └── analysis.py         # AnalysisShell + 4 cards 2x2
├── assets/styles.css       # CSS injetado (paleta, fontes, cards)
└── data/mock.py            # dados mock
```

> Pasta `pages_/` (com underline) é usada para evitar a navegação automática
> do Streamlit; o roteamento é feito manualmente por `st.navigation` em `app.py`.

## Paleta / tipografia

- Brand: `#f97316` (laranja) · Indigo: `#6366f1`
- Bg: `#fafafa` · Card: `#ffffff` · Border: `#e5e7eb`
- Fontes: Inter (UI) + JetBrains Mono (números)

## Próximos passos

Substituir `data/mock.py` por leitura real (Snowflake/Postgres/Supabase) — a UI não precisa mudar.
