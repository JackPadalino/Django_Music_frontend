import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Confetti from "react-confetti";
import { setThrowConfetti } from "../../store/catalogSlice";
import ArtistForm from "./ArtistForm";
import TrackForm from "./TrackForm";
import ModalForm from "./ModalForm";
import "./catalog.css";

const Catalog = () => {
  const dispatch = useDispatch();

  const { storeStyles } = useSelector((state) => state.style);
  const { storeTracks, storeArtists } = useSelector((state) => state.music);

  // confetti state
  const [confettiPieces, setConfettiPieces] = useState(0);
  const { throwConfetti } = useSelector((state) => state.catalog);

  // modal state
  const [modalOpen, setModalOpen] = useState(false);
  const [formType, setFormType] = useState(null);
  const handleModalOpen = (formType) => {
    setFormType(formType);
    setModalOpen(true);
  };
  const handleModalClose = () => setModalOpen(false);

  // confetti timer - the confetti effect is always running, we
  // are just controlling how many pieces are falling at any one
  // time. After 5 seconds the number of pieces is set to 0 and
  // the effect stops
  function start5SecondTimer(callback) {
    setConfettiPieces(2000);
    setTimeout(callback, 2000);
  }

  function confettiCallback() {
    setConfettiPieces(0);
    dispatch(setThrowConfetti(false));
  }

  useEffect(() => {
    if (throwConfetti) start5SecondTimer(confettiCallback);
  }, [throwConfetti]);

  return (
    <>
      <Confetti run={true} numberOfPieces={confettiPieces} gravity={0.2} />
      <div className="catalogContainer">
        <h1 className="catalogHeader">Artists</h1>
        <div className="artistsFormContainer">
          <div className="outerContainer">
            <div className="innerContainer">
              {storeStyles.catalog_style.popup_forms && (
                <>
                  <p
                    className="addArtistTrack"
                    onClick={() => handleModalOpen("artist")}
                  >
                    + Add artist
                  </p>
                  <ModalForm
                    open={modalOpen}
                    handleModalClose={handleModalClose}
                    form={formType === "artist" ? ArtistForm : TrackForm}
                  />
                </>
              )}
              {storeArtists.map((artist) => (
                <p key={artist.id} className="trackArtistParagraph">
                  {artist.name}
                </p>
              ))}
            </div>
          </div>
          {storeStyles.catalog_style.regular_forms && <ArtistForm />}
        </div>
        <h1 className="catalogHeader">Tracks Catalog</h1>
        <div className="tracksFormContainer">
          <div className="outerContainer">
            <div className="innerContainer">
              {storeStyles.catalog_style.popup_forms && (
                <>
                  <p className="addArtistTrack" onClick={handleModalOpen}>
                    + Add track
                  </p>
                  <ModalForm
                    open={modalOpen}
                    handleModalClose={handleModalClose}
                    form={formType === "artist" ? ArtistForm : TrackForm}
                  />
                </>
              )}
              {storeTracks.map((track) => (
                <p key={track.id} className="trackArtistParagraph">
                  {track.artist.name} - {track.title}
                </p>
              ))}
            </div>
          </div>
          {storeStyles.catalog_style.regular_forms && <TrackForm />}
        </div>
      </div>
    </>
  );
};

export default Catalog;
