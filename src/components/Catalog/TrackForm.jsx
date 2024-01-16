import React, { useRef, useState, useEffect } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setStoreTracks, setStoreArtists } from "../../store/musicSlice";
import { setThrowConfetti } from "../../store/catalogSlice";
import "./trackForm.css";

const TrackForm = ({ handleModalClose }) => {
  const dispatch = useDispatch();
  const [title, setTitle] = useState("");
  const [artist, setArtist] = useState("");
  const [genre, setGenre] = useState("");
  const [file, setFile] = useState("");
  const [errorMessage, setErrorMessage] = useState(false);
  const [formValid, setFormValid] = useState(false);

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleArtistChange = (e) => {
    setArtist(e.target.value);
  };

  const handleGenreChange = (e) => {
    setGenre(e.target.value);
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const checkFormValid = () => {
    if (title !== "" && artist !== "" && genre !== "" && file !== "") {
      setFormValid(true);
    } else {
      setFormValid(false);
    }
  };

  const resetForm = () => {
    setTitle("");
    setArtist("");
    setGenre("");

    // To reset the file input form we have to destroy the current
    // input and then create a new one. We have to do this because
    // file inputs are read only, and setting their value directly
    // is not allowed for security reasons
    const newFileInput = document.createElement("input");
    newFileInput.type = "file";
    newFileInput.accept = "audio/mpeg";
    newFileInput.className = "songFileInput";
    newFileInput.style.color = "lightgreen";
    newFileInput.name = "file";
    newFileInput.id = "file";
    newFileInput.addEventListener("change", handleFileChange);
    // Replacing the existing file input with the new one
    const oldFileInput = document.getElementById("file");
    oldFileInput.parentNode.replaceChild(newFileInput, oldFileInput);
  };

  // const uploadFiles = async (e) => {
  //   e.preventDefault();
  //   if (formValid) {
  //     try {
  //       const body = new FormData();
  //       body.append("title", title);
  //       body.append("artist", artist);
  //       body.append("genre", genre);
  //       body.append("file", file);
  //       const response = await axios.post(
  //         `https://django-music-backend.onrender.com/api/music/tracks`,
  //         body
  //       );
  //       if (response.status === 200 || response.status === 201) {
  //         const updatedTrackData = await axios.get(
  //           "https://django-music-backend.onrender.com/api/music/tracks"
  //         );
  //         dispatch(setStoreTracks(updatedTrackData.data));
  //         const updatedArtistData = await axios.get(
  //           "https://django-music-backend.onrender.com/api/music/artists"
  //         );
  //         dispatch(setStoreArtists(updatedArtistData.data));
  //         setErrorMessage(false);
  //         resetForm(); // reset form information
  //         dispatch(setThrowConfetti(true));
  //         handleModalClose && handleModalClose();
  //       }
  //     } catch (error) {
  //       setErrorMessage(true);
  //       console.error("Error uploading file:", error);
  //     }
  //   } else {
  //     setErrorMessage(true);
  //   }
  // };

  const uploadFiles = async (e) => {
    e.preventDefault();
    if (formValid) {
      try {
        setErrorMessage(false);
        resetForm(); // reset form information
        dispatch(setThrowConfetti(true));
        handleModalClose && handleModalClose();
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
  }, [title, artist, genre, file]);

  return (
    <div className="newTrackFormContainer">
      <form
        id="trackUploadForm"
        onSubmit={uploadFiles}
        encType="multipart/form-data"
      >
        <input
          id="title"
          className="newTrackTitleInput"
          value={title}
          name="title"
          type="text"
          placeholder="Track title"
          onChange={handleTitleChange}
        />
        <input
          id="artist"
          className="newTrackAristInput"
          value={artist}
          name="artist"
          type="text"
          placeholder="Artist name"
          onChange={handleArtistChange}
        />
        <input
          id="genre"
          className="newTrackGenreInput"
          value={genre}
          name="genre"
          type="text"
          placeholder="Genre"
          onChange={handleGenreChange}
        />
        <input
          id="file"
          className="songFileInput"
          name="file"
          type="file"
          accept="audio/mpeg"
          onChange={handleFileChange}
          style={{ color: "lightgreen" }}
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

export default TrackForm;
