import { useState, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import axios from "axios";

import WaveSurfer from "wavesurfer.js";

import IconButton from "@mui/material/IconButton";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import PauseIcon from "@mui/icons-material/Pause";
import DownloadIcon from "@mui/icons-material/Download";

import "./footer.css";

const Footer = ({ currentTrack }) => {
  const { storeStyles } = useSelector((state) => state.style);
  const { storeMobileView } = useSelector((state) => state.mobile);
  const [isPlaying, setIsPlaying] = useState(false);
  const wavesurferRef = useRef(null);
  const footerRef = useRef(null);

  const playSong = (currentTrack) => {
    console.log(currentTrack)
    if (footerRef.current) {
      if (wavesurferRef.current) {
        // destroy the current instance before creating a new one
        wavesurferRef.current.destroy();
        wavesurferRef.current = null;
      }

      // create a new instance
      wavesurferRef.current = WaveSurfer.create({
        container: footerRef.current,
        mediaControls: false,
        waveColor: `${storeStyles.footer_style.waveform_color}`,
        progressColor: "rgb(200, 200, 200)",
        height: storeMobileView ? 25 : storeStyles.footer_style.waveform_height,
        barWidth: 1,
        barGap: NaN,
        barRadius: 5,
        barHeight: NaN,
        interact: true,
        dragToSeek: true,
      });

      wavesurferRef.current.load(
        currentTrack.trackFile
      );
      wavesurferRef.current.play();

      wavesurferRef.current.on("play", () => {
        setIsPlaying(true);
      });

      wavesurferRef.current.on("pause", () => {
        setIsPlaying(false);
      });
    }
  };

  const downloadSong = async (currentTrack) => {
    try {
      const response = await axios.get(
        `http://localhost:8000/api/music/tracks/${currentTrack.trackId}/download`,
        {
          responseType: "blob",
        }
      );
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute(
        "download",
        `${currentTrack.trackArtist} - ${currentTrack.trackTitle}.mp3`
      ); // Set the desired filename
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Error downloading song:", error);
    }
  };

  useEffect(() => {
    playSong(currentTrack);
  }, [currentTrack]);

  return (
    <footer
      className="stickyFooter"
      style={{
        backgroundColor: `${storeStyles.footer_style.background_color}`,
      }}
    >
      <div>
        <div>
          <img
            src={currentTrack.trackAlbumCover}
            alt={`${currentTrack.trackTitle} cover`}
          />
        </div>
        <div>
          <b>
            <p
              style={{
                color: `${storeStyles.footer_style.footer_font_color}`,
                fontFamily: `${storeStyles.footer_style.footer_font_family}`,
                fontSize: storeMobileView
                  ? "5px"
                  : `${storeStyles.footer_style.footer_font_size}px`,
              }}
            >
              {currentTrack.trackTitle}
            </p>
          </b>
          <p
            style={{
              color: `${storeStyles.footer_style.footer_font_color}`,
              fontFamily: `${storeStyles.footer_style.footer_font_family}`,
              fontSize: storeMobileView
                ? "5px"
                : `${storeStyles.footer_style.footer_font_size}px`,
            }}
          >
            {currentTrack.trackArtist}
          </p>
        </div>
      </div>
      <div ref={footerRef}></div>
      <div>
        <>
          <IconButton onClick={() => wavesurferRef.current.playPause()}>
            {isPlaying ? (
              <PauseIcon
                fontSize={storeMobileView ? "small" : "large"}
                sx={{
                  color: `${storeStyles.footer_style.play_pause_button_color}`,
                }}
              />
            ) : (
              <PlayArrowIcon
                fontSize="large"
                sx={{
                  color: `${storeStyles.footer_style.play_pause_button_color}`,
                }}
              />
            )}
          </IconButton>
          {!storeMobileView && (
            <IconButton onClick={() => downloadSong(currentTrack)}>
              <DownloadIcon
                fontSize="large"
                sx={{
                  color: `${storeStyles.footer_style.download_button_color}`,
                  "&:hover": {
                    color: "white",
                  },
                }}
              />
            </IconButton>
          )}
        </>
      </div>
    </footer>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
// export default memo(Footer, (prevProps, nextProps) => {
//   return prevProps.trackId === nextProps.trackId;
// });
export default Footer;
