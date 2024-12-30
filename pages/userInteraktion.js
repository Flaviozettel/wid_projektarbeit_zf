import { useState } from "react";
import {
  Select,
  Button,
  Stack,
  MenuItem,
  InputLabel,
  Checkbox,
  FormControl,
  ListItemText,
  TextField,
  Typography,
  Container,
} from "@mui/material";
import axios from "axios";
import data from "./public/meteodaten_2023_daily.json";

export function UserInteraktion({
  Obj,
  setObj,
  Art,
  setArt,
  setStartDate,
  setEndDate,
  Erstellen,
  setAbfrage,
  Abfrage,
}) {
  const arrayObj = [...new Set(data.map((e) => e.Standortname))];
  const optionenObj = arrayObj.map((value, index) => ({
    id: index,
    value: value,
    label: value,
  }));

  const optionenArt = [
    { id: 11, value: "Liniendiagramm", label: "Liniendiagramm" },
    { id: 12, value: "Punktediagramm", label: "Punktediagramm" },
    { id: 13, value: "Säulendiagramm", label: "Säulendiagramm" },
  ];

  const optionenAbfrage = [
    { id: 21, value: "RainDur", label: "Regendauer" },
    { id: 32, value: "p", label: "Luftdruck" },
    { id: 33, value: "T", label: "Temperatur" },
  ];

  function Datumsumwandlung(value, id) {
    const [JJJJ, MM, DD] = value.split("/");
    if (!JJJJ || !MM || !DD) {
      console.error("Gibt das Datum gemäss JJJJ/MM/DD ein");
      return;
    }
    if (JJJJ !== "2023") {
      console.error("Aktuell nur Daten vom Jahr 2023 vorhanden");
      return;
    }
    const date = new Date(`${JJJJ}-${MM}-${DD}`);
    if (
      date.getFullYear() == JJJJ &&
      date.getMonth() + 1 == MM &&
      date.getDate() == DD
    ) {
      if (id == "StartDate") {
        setStartDate(date.toISOString().split("T")[0]);
      } else {
        setEndDate(date.toISOString().split("T")[0]);
      }
    } else {
      console.error("Datum nicht im Wertebereich");
    }
  }

  const Drucken = async () => {
    try {
      const response = await axios.get("http://127.0.0.1:8000/test");
      console.log("Antwort vom Backend:", response.data.message);
    } catch (err) {
      console.error("Fehler beim Zugriff auf das Backend:", err.message);
    }
  };

  return (
    <div
      className="Container"
      style={{ width: 200, display: "flex", flexDirection: "column", gap: 20 }}
    >
      <div>
        <FormControl fullWidth>
          <InputLabel id="Stationen">Stationen</InputLabel>
          <Select
            id="Stationen"
            value={Obj}
            multiple
            label="Stationen"
            onChange={(e) => setObj(e.target.value)}
          >
            {optionenObj.map((e) => (
              <MenuItem key={e.id} value={e.value}>
                <Checkbox />
                <ListItemText primary={e.label} />
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>
      <div>
        <TextField
          id="StartDate"
          label="Von (JJJJ/MM/DD)"
          defaultValue="2023/01/01"
          variant="standard"
          onChange={(e) => {
            Datumsumwandlung(e.target.value, e.target.id);
          }}
        />
      </div>
      <div>
        <TextField
          id="EndDate"
          label="Bis (JJJJ/MM/DD)"
          defaultValue="2023/01/31"
          variant="standard"
          onChange={(e) => {
            Datumsumwandlung(e.target.value, e.target.id);
          }}
        />
      </div>
      <div>
        <FormControl fullWidth>
          <InputLabel id="Visualisierungsart">Visualisierungsart</InputLabel>
          <Select
            id="Visualisierungsart"
            value={Art}
            defaultValue="Liniendiagramm"
            label="Art"
            onChange={(e) => setArt(e.target.value)}
          >
            {optionenArt.map((e) => (
              <MenuItem key={e.id} value={e.value}>
                <ListItemText primary={e.label} />
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>
      <div>
        <FormControl fullWidth>
          <InputLabel id="Abfrage">Abfrage</InputLabel>
          <Select
            id="Abfrage"
            value={Abfrage}
            defaultValue="RainDur"
            label="Abfrage"
            onChange={(e) => setAbfrage(e.target.value)}
          >
            {optionenAbfrage.map((e) => (
              <MenuItem key={e.id} value={e.value}>
                <ListItemText primary={e.label} />
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>

      <Stack spacing={2} direction="row">
        <Button onClick={() => Erstellen()} variant="contained">
          Erstellen
        </Button>
        <Button onClick={() => Drucken()} variant="contained">
          Drucken
        </Button>
      </Stack>
    </div>
  );
}
