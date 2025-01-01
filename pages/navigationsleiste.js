import { useState } from "react";
import { IconButton } from "@mui/material";
import InfoIcon from "@mui/icons-material/Info";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

export default function Navigationsleiste() {
  const [open, setOpen] = useState(false);
  const InfoOpen = () => {
    setOpen(true);
  };

  const InfoClose = () => {
    setOpen(false);
  };

  return (
    <div
      className="container_navi"
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: 1260,
        height: 100,
      }}
    >
      <div style={{ fontSize: 45, fontWeight: "bold" }}>
        Wetterstationen im Raum Zürich
      </div>
      <IconButton
        style={{
          position: "absolute",
          justifyContent: "flex-end",
          marginLeft: 1200,
        }}
        onClick={() => InfoOpen()}
        variant="contained"
      >
        <InfoIcon />
      </IconButton>
      <Dialog open={open} onClose={InfoClose}>
        <DialogTitle>Infos</DialogTitle>
        <DialogContent>
          <DialogContentText>
            `
            <p>
              |) Bitte beachten Sie, dass die Wetterdaten lediglich für das Jahr
              2023 vorliegen.{" "}
            </p>
            <p>||) Beschreibung Parameter:</p>
            <p>
              `ID`: `p`, `Name`: `Luftdruck`, `Einheit`: `hPa`, `Beschreibung`:
              `Mit Luftdruck wird der von der Masse der Luft unter der Wirkung
              der Erdanziehung ausgeübte Druck bezeichnet. Er ist definiert als
              das Gewicht der Luftsäule pro Flächeneinheit vom Erdboden bis zur
              äusseren Grenze der Atmosphäre.`
            </p>
            <p>
              `ID`: `T`, `Name`: `Lufttemperatur`, `Einheit`: `°C`,
              `Beschreibung`: `Physikalisch betrachtet ist die Lufttemperatur
              ein Mass für den Wärmezustand eines Luftvolumens. Dieser wird
              bestimmt durch die mittlere kinetische Energie der ungeordneten
              Molekularbewegung in der Luft. Je grösser die mittlere
              Geschwindigkeit aller Moleküle in einem Luftvolumen ist, um so
              höher ist auch seine Lufttemperatur.`
            </p>
            <p>
              `ID`: `RainDur`, `Name`: `Niederschlagsdauer`, `Einheit`: `min`,
              `Beschreibung`: `Anzahl der Minuten in denen es im
              Mittelungsintervall geregnet hat.`
            </p>
          </DialogContentText>
        </DialogContent>
      </Dialog>
    </div>
  );
}
