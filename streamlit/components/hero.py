from datetime import datetime
import streamlit as st

def render(title: str = "Bem-vindo ao Ciclo 2026", eyebrow: str = "Dashboard de Controle"):
    now = datetime.now().strftime("%d/%m/%Y · %H:%M")
    st.markdown(
        f"""
        <div class="hero">
          <div>
            <span class="eyebrow">{eyebrow}</span>
            <h1>{title}</h1>
          </div>
          <div class="clock"><strong>{now}</strong> &nbsp;GMT-3</div>
        </div>
        """,
        unsafe_allow_html=True,
    )
