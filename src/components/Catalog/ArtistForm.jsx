import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import axios from "axios";
import { setStoreArtists } from "../../store/musicSlice";
import { setThrowConfetti } from "../../store/catalogSlice";
import "./artistForm.css";

const ArtistForm = ({ handleModalClose }) => {
  const dispatch = useDispatch();
  const [artist, setArtist] = useState("");
  const [errorMessage, setErrorMessage] = useState(false);
  const [formValid, setFormValid] = useState(false);

  const handleArtistChange = (e) => {
    setArtist(e.target.value);
  };

  const checkFormValid = () => {
    if (artist !== "") {
      setFormValid(true);
    } else {
      setFormValid(false);
    }
  };

  const resetForm = () => {
    setArtist("");
  };

  const postNewArtist = async (e) => {
    e.preventDefault();
    if (formValid) {
      try {
        const body = new FormData();
        body.append("name", artist);
        const response = await axios.post(
          `https://django-music-backend.onrender.com/api/music/artists/new`,
          body
        );
        if (response.status === 200 || response.status === 201) {
          const updatedArtistData = await axios.get(
            "https://django-music-backend.onrender.com/api/music/artists"
          );
          dispatch(setStoreArtists(updatedArtistData.data));
          setErrorMessage(false);
          resetForm();
          dispatch(setThrowConfetti(true));
          handleModalClose && handleModalClose();
        }
      } catch (error) {
        setErrorMessage(true);
        console.error("Error uploading file:", error);
      }
    } else {
      setErrorMessage(true);
    }
  };

  useEffect(() => {
    checkFormValid();
  }, [artist]);

  return (
    <div className="newArtistFormContainer">
      <form
        id="artistUploadForm"
        onSubmit={postNewArtist}
        encType="multipart/form-data"
      >
        <input
          id="artist"
          className="newArtistInput"
          name="artist"
          type="text"
          placeholder="Artist name"
          value={artist}
          onChange={handleArtistChange}
        />
        <button className="submit-btn" type="submit">
          Submit
        </button>
      </form>
      <p
        style={{
          textAlign: "center",
          color: "lightgreen",
          fontFamily: "Helvetica",
          opacity: errorMessage ? "1" : "0",
        }}
      >
        Oops! Something went wrong!
      </p>
    </div>
  );
};

export default ArtistForm;
