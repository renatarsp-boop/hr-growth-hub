import streamlit as st
from components import header, hero, kpi, insights, analysis


def render():
    header.render()
    hero.render()
    kpi.render()
    st.write("")
    insights.render()
    st.write("")
    analysis.render()
    st.markdown(
        '<div class="site-footer"><div>© 2026 Ciclo Maturidade · Diretoria de Pessoas</div>'
        '<div>Atualizado agora · v0.2.0</div></div>',
        unsafe_allow_html=True,
    )
