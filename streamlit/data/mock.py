"""Dados mock do dashboard Ciclo Maturidade."""
import pandas as pd

KPIS = {
    "total_unidades": 42,
    "total_unidades_delta": +3,          # vs ciclo anterior
    "total_unidades_spark": [36, 37, 39, 38, 40, 41, 42],

    "total_empregados": 1284,
    "total_empregados_delta": +48,
    "total_empregados_spark": [1180, 1198, 1215, 1230, 1246, 1268, 1284],

    "pct_avaliados": 72,
    "pct_avaliados_delta": +14,          # pontos percentuais
    "pct_avaliados_spark": [8, 21, 35, 47, 58, 66, 72],
}

HEADCOUNTS = pd.DataFrame(
    [
        ("Junior",  312, 298),
        ("Pleno",   468, 472),
        ("Senior",  324, 336),
        ("Master",  124, 132),
        ("Expert",   56,  46),
    ],
    columns=["Nivel", "Atual", "Simulado"],
)

CURVAS = pd.DataFrame(
    [
        ("Curva A", 18, 20),
        ("Curva B", 42, 44),
        ("Curva C", 28, 26),
        ("Curva D",  9,  7),
        ("Curva E",  3,  3),
    ],
    columns=["Curva", "Atual", "Simulado"],
)

CATEGORIAS = pd.DataFrame(
    [
        ("Nivel Superior", 824, 836),
        ("Supervisor",     460, 448),
    ],
    columns=["Categoria", "Atual", "Simulado"],
)

EVENTOS = pd.DataFrame(
    [
        ("Promovidos",  86,  "ok"),
        ("Rebaixados",  12,  "danger"),
        ("Em analise",  48,  "warn"),
        ("Inalterados", 1138, "muted"),
    ],
    columns=["Evento", "Qtd", "tone"],
)

# Etapas do ciclo (para timeline)
ETAPAS = [
    ("Abertura",        "done",    "12/jan"),
    ("Autoavaliacao",   "done",    "02/fev"),
    ("Avaliacao Gestor","current", "em curso"),
    ("Calibracao",      "next",    "10/mar"),
    ("Feedback",        "next",    "25/mar"),
    ("Encerramento",    "next",    "05/abr"),
]

# Insights de destaque
INSIGHTS = [
    {
        "tone": "ok",
        "eyebrow": "Destaque",
        "title": "Adesao acima da meta",
        "value": "+14 p.p.",
        "hint": "vs. mesmo periodo do ciclo 2025",
    },
    {
        "tone": "warn",
        "eyebrow": "Atencao",
        "title": "8 unidades abaixo de 50%",
        "value": "8/42",
        "hint": "requerem acompanhamento do RHBP",
    },
    {
        "tone": "brand",
        "eyebrow": "Projecao",
        "title": "Fechamento previsto",
        "value": "05/abr",
        "hint": "no ritmo atual, meta 100% atingivel",
    },
]

# Ranking de unidades (top 5 por adesao)
RANKING = pd.DataFrame(
    [
        ("Usina Tubarao",    98, 312),
        ("Vega do Sul",      94, 186),
        ("BioFlorestas",     91, 142),
        ("Sumare",           88, 224),
        ("Piracicaba",       84, 168),
    ],
    columns=["Unidade", "Adesao", "Empregados"],
)
