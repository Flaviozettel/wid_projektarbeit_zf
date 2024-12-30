# Balken.py
import altair as alt
import pandas as pd
import json

data = pd.read_json("./pages/public/meteodaten_2023_daily.json")
data["Datum"] = pd.to_datetime(data["Datum"], unit="ms")

def Balken(Obj, Abfrage, startDate, endDate):
    Obj = json.loads(Obj)
    try:

        DataFilter = data[
            (data["Datum"] >= startDate) &
            (data["Datum"] <= endDate) &
            (data["Standortname"].isin(Obj))
        ]

        if DataFilter.empty:
            raise ValueError("Keine Daten im gewählten Zeitraum")

        diagramm = alt.Chart(DataFilter).mark_bar().encode(
            alt.X("Datum:T", title=None),
               alt.Y(f"{Abfrage}:Q", title=f"{Abfrage}"),
            color="Standortname:N"
        )

        return diagramm.to_dict()
    except Exception as e:
        print(f"Fehler: {e}")
        return {"error": str(e)}
