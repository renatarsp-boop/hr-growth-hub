import streamlit as st
from data.mock import INSIGHTS, ETAPAS


def _insight_card(item):
    return f"""
    <div class="insight-card tone-{item['tone']}">
      <div class="eyebrow">{item['eyebrow']}</div>
      <div class="title">{item['title']}</div>
      <div class="value">{item['value']}</div>
      <div class="hint">{item['hint']}</div>
    </div>
    """


def _timeline():
    done = sum(1 for _, s, _ in ETAPAS if s == "done")
    total = len(ETAPAS)
    pct = int(((done + 0.5) / total) * 100)  # + meia etapa atual
    steps = ""
    for i, (name, status, when) in enumerate(ETAPAS):
        icon = "✓" if status == "done" else ("●" if status == "current" else str(i + 1))
        steps += f"""
        <div class="step {status}">
          <div class="dot">{icon}</div>
          <div class="meta">
            <div class="name">{name}</div>
            <div class="when">{when}</div>
          </div>
        </div>
        """
    return f"""
    <div class="timeline-card">
      <div class="tl-head">
        <h3>Progresso do Ciclo 2026</h3>
        <span class="tl-pct">{pct}%</span>
      </div>
      <div class="tl-bar"><span style="width:{pct}%"></span></div>
      <div class="tl-steps">{steps}</div>
    </div>
    """


def render():
    cols = st.columns([1, 1, 1, 2], gap="medium")
    for i, item in enumerate(INSIGHTS):
        with cols[i]:
            st.markdown(_insight_card(item), unsafe_allow_html=True)
    with cols[3]:
        st.markdown(_timeline(), unsafe_allow_html=True)
