import streamlit as st

NAV = [
    ("Inicio", True),
    ("RH-Administracao", False),
    ("Ciclo Maturidade", False),
    ("Relatorios", False),
]

def render():
    pills = "".join(
        f'<a class="{"active" if active else ""}" href="#">{label}</a>'
        for label, active in NAV
    )
    st.markdown(
        f"""
        <div class="site-header">
          <div class="brand">
            <div class="logo">CM</div>
            <div>
              <div class="title">Ciclo Maturidade</div>
              <div class="subtitle">Diretoria de Pessoas</div>
            </div>
          </div>
          <nav class="pill-nav">{pills}</nav>
          <div class="user-chip">
            <div style="text-align:right;">
              <div class="name">Ana Souza</div>
              <div class="role">Analista de RH</div>
            </div>
            <div class="avatar">AS</div>
          </div>
        </div>
        """,
        unsafe_allow_html=True,
    )
