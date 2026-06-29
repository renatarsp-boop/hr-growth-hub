import streamlit as st
from components import header, hero, kpi, analysis


def render():
    header.render()
    hero.render()
    kpi.render()
    st.write("")
    analysis.render()
    st.markdown(
        '<div class="site-footer"><div>© 2026 Ciclo Maturidade</div><div>v0.1.0</div></div>',
        unsafe_allow_html=True,
    )
