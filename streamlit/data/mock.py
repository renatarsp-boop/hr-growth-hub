"""Dados mock do dashboard Ciclo Maturidade."""
import pandas as pd

KPIS = {
    "total_unidades": 42,
    "total_empregados": 1284,
    "pct_avaliados": 72,
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
