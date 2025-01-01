import { VegaLite } from "react-vega";

export function Visualisierung({ Grafik, Abfrage }) {
  if (!Grafik) {
    return (
      <div
        className="container_vis"
        style={{ width: 1000, height: 600, background: "#ffebee" }}
      >
        <div
          style={{
            display: "flex",
            marginTop: 130,
            justifyContent: "center",
          }}
        >
          <h1>Platzhalter Grafik</h1>
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
      ></div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: 1000,
          height: 600,
          background: "#ffebee",
        }}
      >
        <VegaLite spec={Grafik} />
      </div>
    </div>
  );
}
