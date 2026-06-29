## Plano: Replicar o Dashboard "Ciclo Maturidade" no Streamlit

Objetivo: reproduzir o visual atual (header, hero, KPIs e grid de análises 2×2) em um app Streamlit com aparência próxima do React/Tailwind, mantendo paleta clara minimalista, cantos arredondados e layout 16:9.

---

### 1. Estrutura do projeto

```text
ciclo-maturidade-streamlit/
├── app.py                  # entrypoint Streamlit (st.navigation)
├── pages/
│   ├── 1_Dashboard.py      # tela principal (réplica do index)
│   ├── 2_RH_Admin.py       # placeholder
│   └── 3_Relatorios.py     # placeholder
├── components/
│   ├── header.py           # SiteHeader custom
│   ├── kpi.py              # KpiCard (st.container + HTML)
│   ├── analysis.py         # AnalysisShell + 4 cards
│   └── hero.py             # Hero com hora local
├── assets/
│   ├── logo.svg
│   └── styles.css          # CSS injetado via st.markdown
├── data/
│   └── mock.py             # dados mock dos KPIs e tabelas
└── requirements.txt        # streamlit, pandas, plotly
```

---

### 2. Configuração base

- `st.set_page_config(layout="wide", page_title="Ciclo Maturidade — Diretoria de Pessoas", page_icon="assets/logo.svg")`
- Injeção de CSS via `st.markdown("<style>...</style>", unsafe_allow_html=True)` carregando `assets/styles.css`:
  - Fontes Google (Inter + JetBrains Mono) via `@import`
  - Variáveis CSS: `--brand:#f97316`, `--indigo:#6366f1`, `--bg:#fafafa`, `--card:#ffffff`, `--border:#e5e7eb`
  - Override de containers Streamlit (`[data-testid="stVerticalBlock"]`, `.block-container`) para reduzir paddings e ativar grid 16:9
  - Classes utilitárias: `.kpi-card`, `.analysis-card`, `.pill-nav`, `.hero-eyebrow` com `border-radius: 16px`, `box-shadow`, `border: 1px solid var(--border)`

---

### 3. Componentes (mapeamento React → Streamlit)

| React (atual) | Streamlit equivalente |
|---|---|
| `SiteHeader` (logo + nav pílulas + avatar) | `st.columns([1,6,2])` + HTML custom para as pílulas + `st.image` para avatar |
| `Hero` (eyebrow, H1, hora) | `st.markdown` com HTML + `datetime.now()` atualizado via `st_autorefresh` |
| `KpiGrid` (4 cards) | `st.columns(4)` com `st.container(border=True)` estilizado por CSS; valor grande + label + barra de progresso (`st.progress` ou HTML) |
| `AnalysisGrid` 2×2 | `st.columns(2)` aninhado em duas linhas |
| `HeadcountsCard` / `CurvasCard` | `pandas.DataFrame` + `st.dataframe` com `column_config` (colunas "Atual" / "Simulado") ou tabela HTML custom |
| `CategoriasCard` / `EventosCard` | mesma abordagem, com chips coloridos via HTML |
| `Footer` | `st.markdown` fixo no final |

---

### 4. Dados

- Mock inicial em `data/mock.py` (dicionários e DataFrames) replicando os valores do dashboard atual: 42 unidades, 1.284 empregados, 72% avaliados, distribuição Junior/Pleno/Senior/Master/Expert, eventos (Promovidos/Rebaixados/Em análise/Inalterados).
- Estrutura preparada para depois trocar por leitura de banco (SQLAlchemy/Snowflake/Supabase) sem mexer na UI.

---

### 5. Limitações conhecidas e mitigações

- **Header fixo com nav em pílulas**: Streamlit não tem header customizável nativo → renderizar como primeiro bloco HTML + CSS `position: sticky; top: 0`.
- **Grid 16:9 apertado**: usar `layout="wide"` + CSS `max-width: 1600px; margin: 0 auto` no `.block-container`, e reduzir `padding-top`.
- **Sidebar nativa**: ocultar via CSS (`[data-testid="stSidebar"] {display:none}`) já que a navegação será custom no header.
- **Animações/hover**: limitadas; usar transições CSS simples nos cards.
- **Multi-página**: usar `st.navigation` (Streamlit ≥ 1.36) em vez da pasta `pages/` automática, para controlar a ordem e os rótulos.

---

### 6. Entregáveis desta primeira iteração

1. `app.py` + `styles.css` + componentes do Dashboard funcionando com dados mock.
2. Visual fiel ao layout React atual: mesma paleta, tipografia, cantos arredondados, 4 KPIs no topo e grid 2×2 de análises abaixo.
3. README com instruções: `pip install -r requirements.txt` → `streamlit run app.py`.

---

### Observação

Este plano cria um **projeto Streamlit novo e separado** do app React atual (que continuará intacto neste repositório Lovable). Se quiser, posso gerar os arquivos Python aqui mesmo em uma pasta `streamlit/` para você baixar, ou apenas entregar o conteúdo para colar em outro repositório. Me diga qual prefere.
