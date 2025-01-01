import { useState, useEffect } from "react";
import Visualisierung from "./visualisierung.js";
import UserInteraktion from "./userInteraktion.js";
import Navigationsleiste from "./navigationsleiste.js";
import axios from "axios";
import Grid2 from "@mui/material/Grid2";

export default function App() {
  const [Art, setArt] = useState("");
  const [Standort, setStandort] = useState([]);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [Grafik, setGrafik] = useState(null);
  const [Error, setError] = useState("");
  const [Abfrage, setAbfrage] = useState("");
  const [optionenStandort, setOptionenStandort] = useState([]);
  const [startDateError, setStartDateError] = useState(false);
  const [endDateError, setEndDateError] = useState(false);
  const [dateErrorText, setDateErrorText] = useState("");
  const [TSstartDate, setTSStartDate] = useState(12345);
  const [TSendDate, setTSEndDate] = useState(12345);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const anfrage = await axios.get(
          `http://127.0.0.1:8000/Meteodaten/Standortnamen`
        );
        setOptionenStandort(anfrage.data);
      } catch (err) {
        setError("Fehler beim Abfragen der Stadortnamen");
      }
    };

    fetchData();
  }, []);

  const Erstellen = async () => {
    setDateErrorText("");
    if (
      !TSendDate ||
      !TSstartDate ||
      !Abfrage ||
      Standort.length === 0 ||
      Art.length === 0
    ) {
      setError("Es wurden nicht alle Parameter abgefüllt");
      return;
    }

    if (
      isNaN(new Date(startDate).getTime()) ||
      isNaN(new Date(endDate).getTime())
    ) {
      setDateErrorText("Datum ungültig");
      return;
    }
    if (TSstartDate >= TSendDate) {
      setDateErrorText("Startdatum kann nicht nach Enddatum liegen");
      setEndDateError(true);
      setStartDateError(true);
      return;
    }

    try {
      const anfrage = await axios.get(`http://127.0.0.1:8000/Altair/${Art}`, {
        params: {
          Standort: JSON.stringify(Standort),
          Abfrage: Abfrage,
          TSstartDate: TSstartDate,
          TSendDate: TSendDate,
        },
      });
      setGrafik(anfrage.data);
    } catch (err) {
      setError(
        "Fehler, Daten wurden nicht aufgerufen. Bitte überprüfen Sie ihre Eingabe"
      );
    }
  };
  return (
    <Grid2
      container
      item
      xs={12}
      style={{ marginLeft: 0, background: "#f0f0f0" }}
    >
      <Navigationsleiste />

      <Grid2
        container
        item
        spacing={2}
        style={{ width: "100%", height: "100vh" }}
      >
        <Grid2 item xs={8}>
          <Visualisierung
            style={{}}
            Grafik={Grafik}
            Erstellen={Erstellen}
            Abfrage={Abfrage}
          />
        </Grid2>
        <Grid2 item xs={4} style={{}}>
          <UserInteraktion
            Art={Art}
            setArt={setArt}
            Standort={Standort}
            setStandort={setStandort}
            startDate={startDate}
            setStartDate={setStartDate}
            endDate={endDate}
            setEndDate={setEndDate}
            Erstellen={Erstellen}
            Abfrage={Abfrage}
            setAbfrage={setAbfrage}
            setOptionenStandort={setOptionenStandort}
            optionenStandort={optionenStandort}
            Error={Error}
            startDateError={startDateError}
            setStartDateError={setStartDateError}
            endDateError={endDateError}
            setEndDateError={setEndDateError}
            dateErrorText={dateErrorText}
            setDateErrorText={setDateErrorText}
            setTSStartDate={setTSStartDate}
            setTSEndDate={setTSEndDate}
            TSstartDate={TSstartDate}
            TSendDate={TSendDate}
          />
        </Grid2>
      </Grid2>
    </Grid2>
  );
}
