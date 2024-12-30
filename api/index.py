from fastapi import FastAPI, Query
from api.Saeulen import Saeulen
from api.Linien import Linien
from api.Punkte import Punkte
from fastapi.middleware.cors import CORSMiddleware 



app = FastAPI(docs_url="/api/py/docs", openapi_url="/api/py/openapi.json")
app.add_middleware( 
CORSMiddleware, 
allow_origins=["*"],   
allow_credentials=True, 
allow_methods=["*"], 
allow_headers=["*"], 
)




### Backend

@app.get("/test")
def test_route():
    return {"message": "Backend-Verbindung funktioniert!"}


@app.get("/Säulendiagramm")
async def getSäulen(Obj: str = Query(...), Abfrage: str = Query(...), startDate: str = Query(...), endDate: str = Query(...)):
    return Saeulen(Obj, Abfrage, startDate, endDate)

@app.get("/Liniendiagramm")
async def getLinien(Obj: str = Query(...), Abfrage: str = Query(...), startDate: str = Query(...), endDate: str = Query(...)):
    return Linien(Obj, Abfrage, startDate, endDate)

@app.get("/Punktediagramm")
async def getLinien(Obj: str = Query(...), Abfrage: str = Query(...), startDate: str = Query(...), endDate: str = Query(...)):
    return Punkte(Obj, Abfrage, startDate, endDate)
