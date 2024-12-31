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

export function UserInteraktion({
  Obj,
  setObj,
  Art,
  setArt,
  startDate,
  endDate,
  setStartDate,
  setEndDate,
  Erstellen,
  setAbfrage,
  Abfrage,
  optionenObj,
  setOptionenObj,
  useEffect,
}) {
  const [open, setOpen] = useState(false);
  const [dateError1, setDateError1] = useState(false);
  const [dateError2, setDateError2] = useState(false);

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
      {
        if (id == "StartDate") {
          setDateError1(true);
        } else {
          setDateError2(true);
        }
      }
      return "Gibt das Datum gemäss JJJJ/MM/DD ein";
    }
    if (JJJJ !== "2023") {
      {
        if (id == "StartDate") {
          setDateError1(true);
        } else {
          setDateError2(true);
        }
      }
      return "Aktuell nur Daten vom Jahr 2023 vorhanden";
    }
    const date = new Date(`${JJJJ}-${MM}-${DD}`);
    if (
      date.getFullYear() == JJJJ &&
      date.getMonth() + 1 == MM &&
      date.getDate() == DD
    ) {
      if (id == "StartDate") {
        setDateError1(false);
        setStartDate(date.toISOString().split("T")[0]);
      } else {
        setDateError2(false);
        setEndDate(date.toISOString().split("T")[0]);
      }
    } else {
      {
        if (id == "StartDate") {
          setDateError1(true);
        } else {
          setDateError2(true);
        }
      }
      return "Datum ist ungültig";
    }
  }

  return (
    <div
      className="Container"
      style={{ width: 250, display: "flex", flexDirection: "column", gap: 25 }}
    >
      <div>
        <FormControl fullWidth>
          <InputLabel id="Stationen">Stationen</InputLabel>
          <Select
            id="Stationen"
            value={Obj}
            multiple
            label="Stationen"
            style={{ fontFamily: "Arial", fontSize: 16, variant: "outlined" }}
            onChange={(e) => setObj(e.target.value)}
            onClick={useEffect}
            open={open}
            onOpen={() => setOpen(true)}
            onClose={() => setOpen(false)}
          >
            {optionenObj.map((station, index) => (
              <MenuItem key={index} value={station}>
                <Checkbox checked={Obj.includes(station)} />
                <ListItemText primary={station} />
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>
      <div>
        <TextField
          id="StartDate"
          error={dateError1}
          label="Von (JJJJ/MM/DD)"
          style={{
            width: "100%",
            fontFamily: "Arial",
            fontSize: 16,
            variant: "outlined",
          }}
          onChange={(e) => {
            Datumsumwandlung(e.target.value, e.target.id);
          }}
        />
      </div>
      <div>
        <TextField
          id="EndDate"
          error={dateError2}
          label="Bis (JJJJ/MM/DD)"
          style={{
            width: "100%",
            fontFamily: "Arial",
            fontSize: 16,
            variant: "outlined",
          }}
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
            label="Art"
            style={{ fontFamily: "Arial", fontSize: 16, variant: "outlined" }}
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
            label="Abfrage"
            style={{ fontFamily: "Arial", fontSize: 16, variant: "outlined" }}
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

      <Button
        onClick={() => Erstellen()}
        style={{
          height: 60,
          border: "1px solid black",
          fontFamily: "Arial",
          fontSize: 16,
          variant: "outlined",
          backgroundColor: "#f0f8ff",
        }}
        disabled={
          !startDate ||
          !endDate ||
          Obj.length === 0 ||
          Art.length === 0 ||
          Abfrage.length === 0
        }
      >
        Erstellen
      </Button>
      {!startDate ||
      !endDate ||
      Obj.length === 0 ||
      Art.length === 0 ||
      Abfrage.length === 0 ? (
        <p style={{ textAlign: "center", marginTop: -10 }}>
          Bitte fülle alle Parameter ab
        </p>
      ) : null}
    </div>
  );
}
