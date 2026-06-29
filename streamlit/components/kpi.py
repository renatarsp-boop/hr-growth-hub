import streamlit as st
from data.mock import KPIS


def _card(label: str, value: str, hint: str = "", progress: int | None = None, tbd: bool = False) -> str:
    bar = ""
    if progress is not None:
        bar = f'<div class="kpi-bar"><span style="width:{progress}%"></span></div>'
    return f"""
    <div class="kpi-card {'tbd' if tbd else ''}">
      <div>
        <div class="label">{label}</div>
        <div class="value">{value}</div>
      </div>
      <div>
        {f'<div class="hint">{hint}</div>' if hint else ''}
        {bar}
      </div>
    </div>
    """


def render():
    cols = st.columns(4, gap="medium")
    with cols[0]:
        st.markdown(_card("Total de Unidades", f"{KPIS['total_unidades']}", "ativas no ciclo"), unsafe_allow_html=True)
    with cols[1]:
        st.markdown(_card("Total de Empregados", f"{KPIS['total_empregados']:,}".replace(",", "."), "no processo"), unsafe_allow_html=True)
    with cols[2]:
        st.markdown(_card("% Empregados Avaliados", f"{KPIS['pct_avaliados']}%", "meta: 100%", progress=KPIS['pct_avaliados']), unsafe_allow_html=True)
    with cols[3]:
        st.markdown(_card("TBD", "—", "a definir", tbd=True), unsafe_allow_html=True)
