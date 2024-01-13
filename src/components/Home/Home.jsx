import { useState, useEffect } from "react";
import { useSelector } from "react-redux";

import { motion, AnimatePresence } from "framer-motion";
import { wrap } from "popmotion";

import { Avatar } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";

import Footer from "./Footer";
import LeftMenu from "./LeftMenu";
import Top10 from "./Top10";
import "./carousel.css";
import "./home.css";

const variants = {
  enter: (direction) => {
    return {
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
    };
  },
  center: {
    zIndex: 1,
    x: 0,
    opacity: 1,
  },
  exit: (direction) => {
    return {
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
    };
  },
};

const Home = () => {
  const [currentTrack, setCurrentTrack] = useState({});
  const [renderCarousel, setRenderCarousel] = useState(false);
  const [renderFooter, setRenderFooter] = useState(false);

  const { storeMobileView } = useSelector((state) => state.mobile);
  const { storeStyles } = useSelector((state) => state.style);
  const { storeTracks } = useSelector((state) => state.music);

  const handlePlay = (trackId, trackTitle, trackArtist, trackAlbumCover) => {
    setCurrentTrack({
      trackId: trackId,
      trackTitle: trackTitle,
      trackArtist: trackArtist,
      trackAlbumCover: trackAlbumCover,
    });
    setRenderFooter(true);
  };

  // Carousl logic
  const images = storeTracks.map(
    (image) => `https://django-music-backend.onrender.com${image.album_cover}`
  );
  const [[page, direction], setPage] = useState([0, 0]);
  const [carouselTrack, setCarouselTrack] = useState(null);
  const imageIndex = wrap(0, images.length, page);

  const paginate = (newDirection) => {
    const nextPage = page + newDirection;

    // Check if the next page is within bounds
    if (nextPage >= 0 && nextPage < storeTracks.length) {
      setPage([nextPage, newDirection]);
      setCarouselTrack(storeTracks[nextPage]);
    }
  };

  useEffect(() => {
    if (storeTracks.length > 0) {
      setCarouselTrack(storeTracks[0]);
      setRenderCarousel(true);
    }
  }, [storeTracks]);

  // play button variables
  const iconSize = storeMobileView ? 15 : 38; // Example sizes for mobile and desktop views
  const avatarSize = storeMobileView ? 25 : 50;

  return (
    <>
      <div className="homeContainer">
        <LeftMenu />
        {renderCarousel && (
          <div className="carouselContainer">
            <AnimatePresence initial={false} custom={direction}>
              <motion.img
                className="carouselImg"
                key={page}
                src={images[imageIndex]}
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{
                  x: { type: "spring", stiffness: 300, damping: 30 },
                  opacity: { duration: 0.2 },
                }}
              />
            </AnimatePresence>
            <div className="next" onClick={() => paginate(1)}>
              {"‣"}
            </div>
            <div className="prev" onClick={() => paginate(-1)}>
              {"‣"}
            </div>
            <div className={`overlay`}>
              <div>
                <b>
                  <p className="overlaytext">{carouselTrack.title}</p>
                </b>
                <p className="overlaytext">{carouselTrack.artist.name}</p>
              </div>
              <div>
                <IconButton
                  onClick={() =>
                    handlePlay(
                      carouselTrack.id,
                      carouselTrack.title,
                      carouselTrack.artist.name,
                      carouselTrack.album_cover
                    )
                  }
                >
                  <Avatar
                    sx={{
                      bgcolor: "grey",
                      width: avatarSize,
                      height: avatarSize,
                    }}
                  >
                    <PlayArrowIcon
                      sx={{ color: "white", fontSize: iconSize }}
                    />
                  </Avatar>
                </IconButton>
              </div>
            </div>
          </div>
        )}
        <Top10 />
      </div>
      <div className="homeMobileContainer">
        {renderCarousel && (
          <>
            <div className="carouselContainer">
              <AnimatePresence initial={false} custom={direction}>
                <motion.img
                  className="carouselImg"
                  key={page}
                  src={images[imageIndex]}
                  custom={direction}
                  variants={variants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{
                    x: { type: "spring", stiffness: 300, damping: 30 },
                    opacity: { duration: 0.2 },
                  }}
                />
              </AnimatePresence>
              <div className="next" onClick={() => paginate(1)}>
                {"‣"}
              </div>
              <div className="prev" onClick={() => paginate(-1)}>
                {"‣"}
              </div>
            </div>
            <div className="playTrackInfoContainer">
              <div className="currentTrackInfo">
                <b>
                  <p>{carouselTrack.title}</p>
                </b>
                <p>{carouselTrack.artist.name}</p>
              </div>
              <IconButton
                onClick={() =>
                  handlePlay(
                    carouselTrack.id,
                    carouselTrack.title,
                    carouselTrack.artist.name,
                    carouselTrack.album_cover
                  )
                }
              >
                <Avatar
                  sx={{
                    bgcolor: "grey",
                    width: avatarSize,
                    height: avatarSize,
                  }}
                >
                  <PlayArrowIcon sx={{ color: "white", fontSize: iconSize }} />
                </Avatar>
              </IconButton>
            </div>
          </>
        )}
        <Top10 />
      </div>
      {renderFooter && <Footer currentTrack={currentTrack} />}
    </>
  );
};

export default Home;
