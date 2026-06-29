"""Ciclo Maturidade — Streamlit entrypoint."""
from pathlib import Path
import streamlit as st

st.set_page_config(
    page_title="Ciclo Maturidade — Diretoria de Pessoas",
    page_icon="📊",
    layout="wide",
    initial_sidebar_state="collapsed",
)

# Inject custom CSS
css_path = Path(__file__).parent / "assets" / "styles.css"
st.markdown(f"<style>{css_path.read_text(encoding='utf-8')}</style>", unsafe_allow_html=True)

from pages_ import dashboard, rh_admin, relatorios  # noqa: E402

PAGES = {
    "Dashboard": dashboard.render,
    "RH-Administracao": rh_admin.render,
    "Relatorios": relatorios.render,
}

# Roteamento simples via query param (a navegação visual no header é HTML estático).
page = st.query_params.get("page", "Dashboard")
if page not in PAGES:
    page = "Dashboard"
PAGES[page]()
