import {
  Select,
  Button,
  MenuItem,
  InputLabel,
  Checkbox,
  FormControl,
  ListItemText,
  TextField,
} from "@mui/material";

export default function UserInteraktion({
  Standort,
  setStandort,
  Art,
  setArt,
  setStartDate,
  setEndDate,
  Erstellen,
  setAbfrage,
  Abfrage,
  optionenStandort,
  useEffect,
  Error,
  dateErrorText,
  setTSStartDate,
  setTSEndDate,
  TSstartDate,
  TSendDate,
}) {
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

  const ParaAbfüllen =
    !TSstartDate ||
    !TSendDate ||
    Standort.length === 0 ||
    Art.length === 0 ||
    Abfrage.length === 0;

  function Datumsumwandlung(value, id) {
    let JJJJ, MM, DD;
    if (value.includes("/")) {
      [JJJJ, MM, DD] = value.split("/");
    } else if (value.includes("-")) {
      [JJJJ, MM, DD] = value.split("-");
    } else {
    }

    const TS = new Date(`${JJJJ}-${MM}-${DD}`).getTime();

    if (isNaN(new Date(TS).getTime())) {
      return false;
    } else if (id == "startDate") {
      setTSStartDate(new Date(TS).getTime());
    } else if (id == "endDate") {
      setTSEndDate(new Date(TS).getTime());
    }
    return true;
  }

  return (
    <div
      className="Container"
      style={{ width: 250, display: "flex", flexDirection: "column", gap: 25 }}
    >
      <div>
        <FormControl fullWidth>
          <InputLabel id="Standort">Standort</InputLabel>
          <Select
            id="Standort"
            value={Standort}
            multiple
            label="Standort"
            style={{ fontFamily: "Arial", fontSize: 16, variant: "outlined" }}
            onChange={(e) => setStandort(e.target.value)}
            onClick={useEffect}
          >
            {optionenStandort.map((station, index) => (
              <MenuItem key={index} value={station}>
                <Checkbox checked={Standort.includes(station)} />
                <ListItemText primary={station} />
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>
      <div>
        <TextField
          id="StartDate"
          label="Von (JJJJ/MM/DD)"
          style={{
            width: "100%",
            fontFamily: "Arial",
            fontSize: 16,
            variant: "outlined",
          }}
          onChange={(e) => {
            Datumsumwandlung(e.target.value, "startDate");
            setStartDate(e.target.value);
          }}
        />
      </div>
      <div>
        <TextField
          id="EndDate"
          label="Bis (JJJJ/MM/DD)"
          style={{
            width: "100%",
            fontFamily: "Arial",
            fontSize: 16,
            variant: "outlined",
          }}
          onChange={(e) => {
            Datumsumwandlung(e.target.value, "endDate");
            setEndDate(e.target.value);
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
          background: "#add8e6",
        }}
        disabled={ParaAbfüllen}
      >
        Erstellen
      </Button>
      {ParaAbfüllen ? (
        <p style={{ textAlign: "center", marginTop: -10 }}>
          Bitte fülle alle Parameter ab
        </p>
      ) : null}
      {dateErrorText && (
        <p style={{ textAlign: "center", marginTop: -10 }}>{dateErrorText}</p>
      )}

      {!dateErrorText && Error && (
        <p style={{ textAlign: "center", marginTop: -10 }}>{Error}</p>
      )}
    </div>
  );
}
