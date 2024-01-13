import { useState, useEffect } from "react";
import "./leftMenu.css";

const LeftMenu = () => {
  return (
    <div className="playlistsContainer">
      <div className="playlistsInner">
        <h1 className="menuHeader">My Snerdy</h1>
        <h1 className="subHeader">Collections</h1>
        <h1 className="subHeader">Downloads</h1>
        <h1 className="playlistsHeader">Playlists</h1>
        <p className="createPlaylist">+ Create playlist</p>
        <p className="playlist">Planet Rhythm</p>
        <p className="playlist">Lars Huismann</p>
        <p className="playlist">Chlar</p>
        <p className="playlist">Hector Oaks</p>
        <p className="playlist">Helena Haufman</p>
        <p className="playlist">Mutual Rytm</p>
        <p className="playlist">SLKT</p>
        <p className="playlist">Hertz</p>
        <p className="playlist">Sway Records</p>
        <p className="playlist">DJ Mika</p>
        <p className="playlist">Keepsakes</p>
        <p className="playlist">Planet Rhythm</p>
        <p className="playlist">CRTB</p>
        <p className="playlist">Timo Maas</p>
        <p className="playlist">Cult</p>
        <p className="playlist">Ned Bennet</p>
        <p className="playlist">Beau Didier</p>
      </div>
    </div>
  );
};

export default LeftMenu;
