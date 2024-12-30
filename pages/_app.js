import { useState } from "react";
import { Visualisierung } from "./visualisierung.js";
import { UserInteraktion } from "./userInteraktion.js";
import Navigationsleiste from "./navigationsleiste.js";
import axios from "axios";
import Grid from "@mui/material/Grid2";

export default function App() {
  const [Art, setArt] = useState("");
  const [Obj, setObj] = useState([]);
  const [startDate, setStartDate] = useState("2023-01-01");
  const [endDate, setEndDate] = useState("2023-01-31");
  const [Grafik, setGrafik] = useState(null);
  const [Error, setError] = useState("");
  const [Abfrage, setAbfrage] = useState("RainDur");

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
      const anfrage = await axios.get(`http://127.0.0.1:8000/${Art}`, {
        params: {
          Obj: JSON.stringify(Obj),
          Abfrage: Abfrage,
          startDate: startDate.toString(),
          endDate: endDate.toString(),
        },
      });
      setGrafik(anfrage.data);
    } catch (err) {
      setError("Fehler, Daten wurden nicht aufgerufen"); //* Irgendwo muss ich noch einbauen, dass wenn nicht alle Parameter abgefüllt ein Fehler auftritt
    }
  };
  return (
    <Grid container item xs={12}>
      <Navigationsleiste />

      <Grid container spacing={2} style={{ width: "100%", height: "100vh" }}>
        <Grid item xs={6}>
          {Error}
          <Visualisierung
            style={{}}
            Grafik={Grafik}
            Erstellen={Erstellen}
            Abfrage={Abfrage}
          />
        </Grid>
        <Grid item xs={6} style={{ background: "#f0f0f0" }}>
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
          />
        </Grid>
      </Grid>
    </Grid>
  );
}
