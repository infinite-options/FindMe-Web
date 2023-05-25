import React, { useState } from "react";
import AddPhoto from "../Icons/AddPhotoIcon.png";
import {
  xSmall,
  bold,
  mediumBold,
  red,
  small,
  hidden,
  tileImg,
} from "../styles";

function UploadPhotos(props) {
  const [imageState, setImageState] = props.state;

  const [errorMessage, setErrorMessage] = useState("");
  const readImage = (file) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      file.image = e.target.result;
      const newImageState = [...imageState];
      newImageState.push(file);
      setImageState(newImageState);
    };
    reader.readAsDataURL(file.file);
  };

  const addFile = (e) => {
    const file = {
      index: imageState.length,
      file: e.target.files[0],
      image: null,
      coverPhoto: imageState.length === 0,
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
  console.log(imageState);
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div className="d-flex overflow-auto mb-3">
        <input
          id="contained-button-file"
          style={{ display: "none" }}
          type="file"
          accept="image/*"
          onChange={addFile}
          className="d-none"
        />

        <label
          htmlFor="contained-button-file"
          className="d-flex justify-content-center align-items-center"
        >
          <img src={AddPhoto} style={{ width: "2rem" }} alt="add an image" />
        </label>
      </div>
      <div>
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
                // src={file.image}
                src={file.image}
                style={{ ...tileImg, objectFit: "cover" }}
              />
            ) : (
              <img
                key={Date.now()}
                src={file.image}
                // src={`${file.image}?${Date.now()}`}
                style={{ ...tileImg, objectFit: "cover" }}
              />
            )}
          </div>
        ))}
      </div>

      <div className="text-center" style={errorMessage === "" ? hidden : {}}>
        <p style={{ ...red, ...small }}>{errorMessage || "error"}</p>
      </div>
    </div>
  );
}

export default UploadPhotos;
