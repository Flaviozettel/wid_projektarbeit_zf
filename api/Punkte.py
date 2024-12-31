
import altair as alt
import pandas as pd
import json

meteodaten= pd.read_json("./data/meteodaten_2023_daily.json")
meteodaten["Datum"] = pd.to_datetime(meteodaten["Datum"], unit="ms")

def Punkte(Obj, Abfrage, startDate, endDate):
    Obj = json.loads(Obj)
    try:

        DataFilter = meteodaten[
            (meteodaten["Datum"] >= startDate) &
            (meteodaten["Datum"] <= endDate) &
            (meteodaten["Standortname"].isin(Obj))
        ]

        if DataFilter.empty:
            raise ValueError("Keine Daten im gewählten Zeitraum")

        diagramm = alt.Chart(DataFilter).mark_point().encode(
            alt.X("Datum:T", title=None),
            alt.Y(f"{Abfrage}:Q", title=f"{Abfrage}"),
            color="Standortname:N"
        )

        return diagramm.to_dict()
    except Exception as e:
        return {"error"}
