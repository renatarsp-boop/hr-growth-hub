import streamlit as st
from data.mock import KPIS


def _sparkline_svg(values, color="#f97316", width=140, height=36):
    if not values:
        return ""
    vmin, vmax = min(values), max(values)
    rng = (vmax - vmin) or 1
    step = width / (len(values) - 1) if len(values) > 1 else width
    pts = [
        (i * step, height - ((v - vmin) / rng) * (height - 6) - 3)
        for i, v in enumerate(values)
    ]
    poly = " ".join(f"{x:.1f},{y:.1f}" for x, y in pts)
    area = f"0,{height} " + poly + f" {width},{height}"
    last_x, last_y = pts[-1]
    return f"""
    <svg viewBox="0 0 {width} {height}" width="100%" height="{height}" preserveAspectRatio="none">
      <defs>
        <linearGradient id="g_{color[1:]}" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stop-color="{color}" stop-opacity="0.28"/>
          <stop offset="100%" stop-color="{color}" stop-opacity="0"/>
        </linearGradient>
      </defs>
      <polygon points="{area}" fill="url(#g_{color[1:]})"/>
      <polyline points="{poly}" fill="none" stroke="{color}" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
      <circle cx="{last_x:.1f}" cy="{last_y:.1f}" r="2.6" fill="{color}"/>
    </svg>
    """


def _delta_chip(delta, suffix=""):
    if delta is None:
        return ""
    up = delta >= 0
    arrow = "▲" if up else "▼"
    cls = "ok" if up else "danger"
    sign = "+" if up else ""
    return f'<span class="delta {cls}">{arrow} {sign}{delta}{suffix}</span>'


def _card(label, value, hint="", delta=None, delta_suffix="", spark=None, spark_color="#f97316", tbd=False):
    return f"""
    <div class="kpi-card {'tbd' if tbd else ''}">
      <div class="kpi-top">
        <span class="label">{label}</span>
        {_delta_chip(delta, delta_suffix) if delta is not None else ''}
      </div>
      <div class="value">{value}</div>
      <div class="kpi-bottom">
        <span class="hint">{hint}</span>
        <div class="spark">{_sparkline_svg(spark or [], color=spark_color) if spark else ''}</div>
      </div>
    </div>
    """


def render():
    cols = st.columns(4, gap="medium")
    with cols[0]:
        st.markdown(_card(
            "Total de Unidades", f"{KPIS['total_unidades']}",
            hint="ativas no ciclo",
            delta=KPIS["total_unidades_delta"],
            spark=KPIS["total_unidades_spark"],
            spark_color="#6366f1",
        ), unsafe_allow_html=True)
    with cols[1]:
        st.markdown(_card(
            "Total de Empregados", f"{KPIS['total_empregados']:,}".replace(",", "."),
            hint="no processo",
            delta=KPIS["total_empregados_delta"],
            spark=KPIS["total_empregados_spark"],
            spark_color="#0ea5e9",
        ), unsafe_allow_html=True)
    with cols[2]:
        st.markdown(_card(
            "% Empregados Avaliados", f"{KPIS['pct_avaliados']}%",
            hint="meta 100%",
            delta=KPIS["pct_avaliados_delta"], delta_suffix=" p.p.",
            spark=KPIS["pct_avaliados_spark"],
            spark_color="#f97316",
        ), unsafe_allow_html=True)
    with cols[3]:
        st.markdown(_card("TBD", "—", hint="indicador a definir", tbd=True), unsafe_allow_html=True)
