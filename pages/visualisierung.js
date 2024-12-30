import { useState } from "react";
import { VegaLite } from "react-vega";
import axios from "axios";
import { App } from "./_app.js";

export function Visualisierung({ Grafik, Abfrage }) {
  if (!Grafik) {
    return (
      <div
        className="container_vis"
        style={{ width: 600, height: 450, background: "#ffebee" }}
      >
        <div
          style={{
            display: "flex",
            marginTop: 130,
            justifyContent: "center",
          }}
        >
          <h1>Platzhalter</h1>
        </div>
      </div>
    );
  }
  return (
    <div className="container_vis">
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div style={{ fontSize: 25, fontWeight: "bold" }}>
          {Abfrage === "T"
            ? "Temperatur nach Datum und Station im Raum Zürich"
            : Abfrage === "p"
            ? "Luftdruck nach Datum und Station im Raum Zürich"
            : Abfrage === "RainDur"
            ? "Regendauer nach Datum und Station im Raum Zürich"
            : ""}{" "}
        </div>
      </div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: 600,
          height: 450,
          background: "#ffebee",
        }}
      >
        <VegaLite spec={Grafik} />
      </div>
    </div>
  );
}
