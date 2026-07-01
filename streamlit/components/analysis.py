import streamlit as st
import plotly.graph_objects as go
from data.mock import HEADCOUNTS, CURVAS, EVENTOS, RANKING

BRAND = "#f97316"
INDIGO = "#6366f1"
MUTED = "#94a3b8"
BG_CARD = "#ffffff"


def _layout(fig, height=240):
    fig.update_layout(
        height=height,
        margin=dict(l=8, r=8, t=8, b=8),
        paper_bgcolor=BG_CARD,
        plot_bgcolor=BG_CARD,
        font=dict(family="Inter, sans-serif", size=12, color="#334155"),
        legend=dict(orientation="h", y=-0.18, x=0, font=dict(size=11)),
        showlegend=True,
    )
    fig.update_xaxes(showgrid=False, zeroline=False, tickfont=dict(size=11))
    fig.update_yaxes(showgrid=True, gridcolor="#f1f5f9", zeroline=False, tickfont=dict(size=11))
    return fig


def _headcounts_chart():
    fig = go.Figure()
    fig.add_bar(name="Atual",    x=HEADCOUNTS["Nivel"], y=HEADCOUNTS["Atual"],
                marker_color=INDIGO, marker_line_width=0)
    fig.add_bar(name="Simulado", x=HEADCOUNTS["Nivel"], y=HEADCOUNTS["Simulado"],
                marker_color=BRAND, marker_line_width=0)
    fig.update_layout(barmode="group", bargap=0.35, bargroupgap=0.08)
    return _layout(fig)


def _curvas_chart():
    fig = go.Figure()
    fig.add_trace(go.Pie(
        labels=CURVAS["Curva"], values=CURVAS["Simulado"], hole=0.62,
        marker=dict(colors=["#f97316", "#fb923c", "#fdba74", "#6366f1", "#a5b4fc"], line=dict(color="#fff", width=2)),
        textinfo="label+percent", textfont=dict(size=11),
    ))
    total = int(CURVAS["Simulado"].sum())
    fig.add_annotation(text=f"<b>{total}%</b><br><span style='color:#94a3b8;font-size:10px'>SIMULADO</span>",
                       showarrow=False, font=dict(size=18, color="#0f172a"))
    fig.update_layout(showlegend=False, height=240,
                      margin=dict(l=8, r=8, t=8, b=8),
                      paper_bgcolor=BG_CARD, plot_bgcolor=BG_CARD,
                      font=dict(family="Inter, sans-serif"))
    return fig


def _eventos_html():
    total = int(EVENTOS["Qtd"].sum()) or 1
    rows = ""
    for _, r in EVENTOS.iterrows():
        pct = r["Qtd"] / total * 100
        rows += f"""
        <div class="ev-row">
          <div class="ev-head">
            <span class="chip {r['tone']}">{r['Evento']}</span>
            <span class="ev-qty">{r['Qtd']:,}</span>
          </div>
          <div class="ev-bar"><span class="tone-{r['tone']}" style="width:{pct:.1f}%"></span></div>
        </div>
        """.replace(",", ".")
    return f'<div class="ev-list">{rows}</div>'


def _ranking_html():
    rows = ""
    for _, r in RANKING.iterrows():
        rows += f"""
        <div class="rk-row">
          <div class="rk-head">
            <span class="rk-name">{r['Unidade']}</span>
            <span class="rk-val">{r['Adesao']}%</span>
          </div>
          <div class="rk-bar"><span style="width:{r['Adesao']}%"></span></div>
          <div class="rk-sub">{r['Empregados']} empregados</div>
        </div>
        """
    return f'<div class="rk-list">{rows}</div>'


def _shell_open(title, sub=""):
    sub_html = f'<span class="sub">{sub}</span>' if sub else ""
    return f'<div class="analysis-card"><div class="ac-head"><h3>{title}</h3>{sub_html}</div>'


def render():
    row1 = st.columns([1.2, 1, 1], gap="medium")
    with row1[0]:
        st.markdown(_shell_open("Distribuicao Headcounts", "Atual vs Simulado"), unsafe_allow_html=True)
        st.plotly_chart(_headcounts_chart(), use_container_width=True, config={"displayModeBar": False})
        st.markdown("</div>", unsafe_allow_html=True)
    with row1[1]:
        st.markdown(_shell_open("Distribuicao Curvas", "% simulado"), unsafe_allow_html=True)
        st.plotly_chart(_curvas_chart(), use_container_width=True, config={"displayModeBar": False})
        st.markdown("</div>", unsafe_allow_html=True)
    with row1[2]:
        st.markdown(_shell_open("Eventos", "movimentacoes previstas") + _eventos_html() + "</div>",
                    unsafe_allow_html=True)

    st.write("")
    st.markdown(_shell_open("Top Unidades por Adesao", "% avaliados") + _ranking_html() + "</div>",
                unsafe_allow_html=True)
