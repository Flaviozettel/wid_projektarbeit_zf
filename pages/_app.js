import { useState, useEffect } from "react";
import { Visualisierung } from "./visualisierung.js";
import { UserInteraktion } from "./userInteraktion.js";
import Navigationsleiste from "./navigationsleiste.js";
import axios from "axios";
import Grid2 from "@mui/material/Grid2";

export default function App() {
  const [Art, setArt] = useState("");
  const [Obj, setObj] = useState([]);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [Grafik, setGrafik] = useState(null);
  const [Error, setError] = useState("");
  const [Abfrage, setAbfrage] = useState("");
  const [optionenObj, setOptionenObj] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const anfrage = await axios.get(
          `http://127.0.0.1:8000/Meteodaten/Standortnamen`
        );
        setOptionenObj(anfrage.data);
      } catch (err) {
        setError("Fehler beim Abfragen der Stadortnamen");
      }
    };

    fetchData();
  }, []);

  const Erstellen = async () => {
    setError("");
    if (
      !startDate ||
      !endDate ||
      !Abfrage ||
      Obj.length === 0 ||
      Art.length === 0
    ) {
      setError("Es werden Start- und Enddatum benötigt");
      return;
    }
    try {
      const anfrage = await axios.get(`http://127.0.0.1:8000/Altair/${Art}`, {
        params: {
          Obj: JSON.stringify(Obj),
          Abfrage: Abfrage,
          startDate: startDate,
          endDate: endDate,
        },
      });
      setGrafik(anfrage.data);
    } catch (err) {
      setError("Fehler, Daten wurden nicht aufgerufen"); //* Irgendwo muss ich noch einbauen, dass wenn nicht alle Parameter abgefüllt ein Fehler auftritt
    }
  };
  return (
    <Grid2 container xs={12} style={{ marginLeft: 50 }}>
      <Navigationsleiste />

      <Grid2 container spacing={2} style={{ width: "100%", height: "100vh" }}>
        <Grid2 item xs={8}>
          {Error}
          <Visualisierung
            style={{}}
            Grafik={Grafik}
            Erstellen={Erstellen}
            Abfrage={Abfrage}
          />
        </Grid2>
        <Grid2 item xs={4} style={{ background: "#f0f0f0" }}>
          <UserInteraktion
            Art={Art}
            setArt={setArt}
            Obj={Obj}
            setObj={setObj}
            startDate={startDate}
            setStartDate={setStartDate}
            endDate={endDate}
            setEndDate={setEndDate}
            Erstellen={Erstellen}
            Abfrage={Abfrage}
            setAbfrage={setAbfrage}
            setOptionenObj={setOptionenObj}
            optionenObj={optionenObj}
          />
        </Grid2>
      </Grid2>
    </Grid2>
  );
}
