import { useState, useEffect } from "react";
import "./top10.css";

const Top10 = () => {
  const charts = [
    "Planet Rhythm",
    "Lars Huismann",
    "Chlar",
    "Hector Oaks",
    "Helena Haufman",
    "Mutual Rytm",
    "SLKT",
    "Sway Records",
    "DJ Mika",
  ];

  return (
    <div className="top10Container">
      <div className="top10Inner">
        <h1 className="chartHeader">Top 10 Charts</h1>
        <div className="miniChartDivContainer">
          {charts.map((chart, index) => (
            <div className="miniChartDiv" key={index}>
              <p className="chart">{chart}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Top10;
