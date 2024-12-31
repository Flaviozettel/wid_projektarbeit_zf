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

@app.get("/Meteodaten/Standortnamen")
async def getStandortnamen():

    optionenObj=list(set(i["Standortname"] for i in meteodaten))
            
    print(optionenObj)
    return optionenObj
    



@app.get("/Altair/Säulendiagramm")
async def getSäulen(Obj: str = Query(...), Abfrage: str = Query(...), startDate: str = Query(...), endDate: str = Query(...)):
    return Saeulen(Obj, Abfrage, startDate, endDate)

@app.get("/Altair/Liniendiagramm")
async def getLinien(Obj: str = Query(...), Abfrage: str = Query(...), startDate: str = Query(...), endDate: str = Query(...)):
    return Linien(Obj, Abfrage, startDate, endDate)

@app.get("/Altair/Punktediagramm")
async def getLinien(Obj: str = Query(...), Abfrage: str = Query(...), startDate: str = Query(...), endDate: str = Query(...)):
    return Punkte(Obj, Abfrage, startDate, endDate)
