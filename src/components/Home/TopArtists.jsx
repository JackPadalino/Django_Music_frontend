import { useState, useEffect } from "react";
import "./topArtists.css";

const TopArtists = () => {
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
    "Tony Alvarez",
    "The Crystal Method",
    "Purple Disco Machine",
    "Modern Boheme",
    "SNERD"
  ];

  return (
    <div className="topArtistsContainer">
      <div className="topArtistsInner">
        <h1 className="artistsHeader">Top New Artists</h1>
        <div className="miniArtistDivContainer">
          {charts.map((chart, index) => (
            <div className="miniArtistDiv" key={index}>
              <p className="artist">{chart}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TopArtists;
