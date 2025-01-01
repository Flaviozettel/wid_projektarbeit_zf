from fastapi import FastAPI, Query
from .Saeulen import Saeulen
from .Linien import Linien
from .Punkte import Punkte
from fastapi.middleware.cors import CORSMiddleware
import json



app = FastAPI(docs_url="/api/py/docs", openapi_url="/api/py/openapi.json")
app.add_middleware( 
CORSMiddleware, 
allow_origins=["*"],   
allow_credentials=True, 
allow_methods=["*"], 
allow_headers=["*"], 
)

with open("./data/meteodaten_2023_daily.json", "r") as data:
    meteodaten = json.load(data)

@app.get("/api/py/Meteodaten/Standortnamen")
async def getStandortnamen():

    optionenStandort=list(set(i["Standortname"] for i in meteodaten))
            
    return optionenStandort
    



@app.get("/api/py/Altair/Säulendiagramm")
async def getSäulen(Standort: str = Query(...), Abfrage: str = Query(...), TSstartDate: int = Query(...), TSendDate: int = Query(...)):
    return Saeulen(Standort, Abfrage, TSstartDate, TSendDate)

@app.get("/api/py/Altair/Liniendiagramm")
async def getLinien(Standort: str = Query(...), Abfrage: str = Query(...), TSstartDate: int = Query(...), TSendDate: int = Query(...)):
    return Linien(Standort, Abfrage, TSstartDate, TSendDate)

@app.get("/api/py/Altair/Punktediagramm")
async def getLinien(Standort: str = Query(...), Abfrage: str = Query(...), TSstartDate: int = Query(...), TSendDate: int = Query(...)):
    return Punkte(Standort, Abfrage, TSstartDate, TSendDate)
