import altair as alt
import pandas as pd
import json

meteodaten= pd.read_json("./data/meteodaten_2023_daily.json")
meteodaten["Datum"] = pd.to_datetime(meteodaten["Datum"], unit="ms")

def Linien(Standort, Abfrage, TSstartDate, TSendDate):
    Standort = json.loads(Standort)
    try:

        DataFilter = meteodaten[
            (meteodaten["Datum"] >= pd.to_datetime(TSstartDate, unit="ms")) &
            (meteodaten["Datum"] <= pd.to_datetime(TSendDate, unit="ms")) &
            (meteodaten["Standortname"].isin(Standort))
        ]

        if len(DataFilter) == 0:
            raise ValueError("Keine Daten im gewählten Zeitraum")
        
        if Abfrage=="RainDur": 
            Abfrage_typ= "Regendauer [min]" 
        elif Abfrage == "p": 
            Abfrage_typ= "Luftdruck [hpa]"  
        else: 
            Abfrage_typ="Temperatur [°C]"

        diagramm = alt.Chart(DataFilter).mark_line().encode(
             x=alt.X("Datum:T", axis=alt.Axis(grid=False, format="%d.%m.%Y", labelAngle=-90, labelFontSize=12, titleFontSize=12, labelFont="Arial", titleFont="Arial", title="Datum", tickCount="day")),
            y=alt.Y(f"{Abfrage}:Q", axis=alt.Axis(grid=True,  labelFontSize=12, titleFontSize=12, labelFont="Arial", titleFont="Arial", title=f"{Abfrage_typ}")),
            color=alt.Color("Standortname:N", legend=alt.Legend(title="Legende",labelFontSize=12, labelFont="Arial", orient="right"))
        ).properties(width= 450, height= 400, title=f"Vergleich {Abfrage_typ} im Zeitraum vom {pd.to_datetime(TSstartDate, unit="ms").strftime('%m.%d.%Y')} bis {pd.to_datetime(TSendDate, unit="ms").strftime('%m.%d.%Y')} im Raum Zürich")

        return diagramm.to_dict()
    except Exception as e:
        return {"error"}
