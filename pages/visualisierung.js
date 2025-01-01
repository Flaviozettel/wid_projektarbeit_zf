import { VegaLite } from "react-vega";

export default function Visualisierung({ Grafik }) {
  if (!Grafik) {
    return (
      <div className="container_vis" style={{ width: 1000, height: 600 }}>
        <div
          style={{
            display: "flex",
            marginTop: 130,
            justifyContent: "center",
            border: "1px solid black",
            width: 400,
            marginLeft: 450,
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
        }}
      >
        <VegaLite spec={Grafik} />
      </div>
    </div>
  );
}
