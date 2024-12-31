
import altair as alt
import pandas as pd
import json


meteodaten= pd.read_json("./data/meteodaten_2023_daily.json")
print(meteodaten.head())
meteodaten["Datum"] = pd.to_datetime(meteodaten["Datum"], unit="ms")

def Saeulen(Obj, Abfrage, startDate, endDate):
    Obj = json.loads(Obj)
    try:

        DataFilter = meteodaten[
            (meteodaten["Datum"] >= startDate) &
            (meteodaten["Datum"] <= endDate) &
            (meteodaten["Standortname"].isin(Obj))
        ]

        if DataFilter.empty:
            raise ValueError("Keine Daten im gewählten Zeitraum")
        
        if Abfrage=="RainDur": 
            Abfrage_typ= "Regendauer" 
        elif Abfrage == "p": 
            Abfrage_typ= "Luftdruck"  
        else: 
            Abfrage_typ="Temperatur"

        diagramm = alt.Chart(DataFilter).mark_bar(size=15).encode(
            x=alt.X("Datum:T", axis=alt.Axis(grid=False, format="%d.%m.%Y", labelAngle=-90, labelFontSize=12, titleFontSize=12, labelFont="Arial", titleFont="Arial", title="Datum")),
            y=alt.Y(f"{Abfrage}:Q", axis=alt.Axis(grid=True,  labelFontSize=12, titleFontSize=12, labelFont="Arial", titleFont="Arial", title=f"{Abfrage_typ}")),
            color=alt.Color("Standortname:N", legend=alt.Legend(title="Legende",labelFontSize=12, labelFont="Arial", orient="right"))

        ).properties(width= 450, height= 400, title=f"Vergleich {Abfrage_typ} nach Datum und Station")

        return diagramm.to_dict()
    except Exception as e:
        return {"error"}
    
