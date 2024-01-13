import { useState, useEffect } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import Nav from "./components/Nav/Nav";
import Home from "./components/Home/Home";
import Router from "./components/Router";
import { setStoreTracks, setStoreArtists } from "../src/store/musicSlice";
import { setStoreStyles } from "../src/store/styleSlice";
import { setStoreMobileView } from "../src/store/mobileSlice";
import "./style.css";

function App() {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const { storeStyles } = useSelector((state) => state.style);

  const fetchTrackArtists = () => {
    axios
      .get("https://django-music-backend.onrender.com/api/music/tracks")
      .then((trackData) => {
        dispatch(setStoreTracks(trackData.data));
        return axios.get("https://django-music-backend.onrender.com/api/music/artists");
      })
      .then((artistData) => {
        dispatch(setStoreArtists(artistData.data));
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setLoading(false);
      });
  };

  const fetchStyles = () => {
    axios
      .get("https://django-music-backend.onrender.com/api/music/styles")
      .then((styleData) => {
        dispatch(setStoreStyles(styleData.data));
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchStyles();
    fetchTrackArtists();
  }, []);

  /* check for screen width and adjust waveform styling*/
  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 1280px)");
    dispatch(setStoreMobileView(mediaQuery.matches));
  }, []);

  if (loading) return <p>Loading...</p>;
  return (
    <div
      style={{
        backgroundColor: `${storeStyles.main_style.page_body_color}`,
        width: "100vw",
        height: "100vh",
        overflow: "auto", // Add overflow if content is taller than the viewport
      }}
    >
      <Nav />
      <Router />
    </div>
  );
}

export default App;
