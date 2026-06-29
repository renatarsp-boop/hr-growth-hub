import streamlit as st
from data.mock import HEADCOUNTS, CURVAS, CATEGORIAS, EVENTOS


def _two_col_table(df, label_col: str, suffix: str = "") -> str:
    rows = "".join(
        f"<tr><td>{r[label_col]}</td>"
        f"<td class='num'>{r['Atual']}{suffix}</td>"
        f"<td class='num'>{r['Simulado']}{suffix}</td></tr>"
        for _, r in df.iterrows()
    )
    return f"""
    <table class="analysis-table">
      <thead><tr><th>{label_col}</th><th class="num">Atual</th><th class="num">Simulado</th></tr></thead>
      <tbody>{rows}</tbody>
    </table>
    """


def _shell(title: str, inner_html: str) -> str:
    return f'<div class="analysis-card"><h3>{title}</h3>{inner_html}</div>'


def _eventos_html() -> str:
    rows = "".join(
        f"<tr><td><span class='chip {r['tone']}'>{r['Evento']}</span></td>"
        f"<td class='num'>{r['Qtd']:,}</td></tr>".replace(",", ".")
        for _, r in EVENTOS.iterrows()
    )
    return f"""
    <table class="analysis-table">
      <thead><tr><th>Evento</th><th class="num">Quantidade</th></tr></thead>
      <tbody>{rows}</tbody>
    </table>
    """


def render():
    row1 = st.columns(2, gap="medium")
    with row1[0]:
        st.markdown(_shell("Distribuicao Headcounts", _two_col_table(HEADCOUNTS, "Nivel")), unsafe_allow_html=True)
    with row1[1]:
        st.markdown(_shell("Distribuicao Curvas (%)", _two_col_table(CURVAS, "Curva", suffix="%")), unsafe_allow_html=True)

    st.write("")
    row2 = st.columns(2, gap="medium")
    with row2[0]:
        st.markdown(_shell("Categorias", _two_col_table(CATEGORIAS, "Categoria")), unsafe_allow_html=True)
    with row2[1]:
        st.markdown(_shell("Eventos", _eventos_html()), unsafe_allow_html=True)
