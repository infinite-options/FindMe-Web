import React, { useState } from "react";
import { Box, Button, Stack } from "@mui/material";
import UploadImage from "../Icons/UploadImage.svg";
import {
  xSmall,
  bold,
  mediumBold,
  red,
  small,
  hidden,
  tileImg,
} from "../styles";
import useStyles from "../theming/styles";

function UploadPhotos(props) {
  const classes = useStyles();
  const [imageState, setImageState] = props.state;

  const [errorMessage, setErrorMessage] = useState("");
  const readImage = (file) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      file.image = e.target.result;
      const newImageState = [...imageState];
      newImageState[0] = file;
      setImageState(newImageState);
    };
    reader.readAsDataURL(file.file);
  };

  const addFile = (e) => {
    const file = {
      index: 0,
      file: e.target.files[0],
      image: null,
      coverPhoto: true,
    };
    let isLarge = file.file.size > 5000000;
    let file_size = (file.file.size / 1000000).toFixed(1);
    if (isLarge) {
      // console.log("set error message");
      setErrorMessage(`Your file size is too large (${file_size} MB)`);
      return;
    } else {
      setErrorMessage("");
    }

    readImage(file);
  };
  return (
    <Stack
      direction="row"
      justifyContent="center"
      alignItems="center"
      sx={{ mt: 2, p: 2 }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <input
          id="contained-button-file"
          style={{ display: "none" }}
          type="file"
          accept="image/*"
          onChange={addFile}
        />
        <label htmlFor="contained-button-file">
          <img src={UploadImage} style={{ width: "2rem" }} alt="add an image" />
          {/* <img src={AddPhoto} style={{ width: "2rem" }} alt="add an image" /> */}
        </label>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          margin: "0.5rem",
        }}
      >
        {imageState.map((file, i) => (
          <div
            className="mx-2"
            style={{
              position: "relative",
              minHeight: "100px",
              minWidth: "100px",
              height: "100px",
              width: "100px",
            }}
            key={i}
          >
            {file.file === null ? (
              <img
                key={Date.now()}
                src={`${file.image}?${Date.now()}`}
                style={{ ...tileImg, objectFit: "cover" }}
              />
            ) : (
              <img
                key={Date.now()}
                src={file.image}
                style={{ ...tileImg, objectFit: "cover" }}
              />
            )}
          </div>
        ))}
      </div>

      <div className="text-center" style={errorMessage === "" ? hidden : {}}>
        <p style={{ ...red, ...small }}>{errorMessage || "error"}</p>
      </div>
    </Stack>
  );
}

export default UploadPhotos;
