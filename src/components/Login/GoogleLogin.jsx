import React, { useState, useEffect } from "react";
import jwt_decode from "jwt-decode";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const CLIENT_ID = process.env.REACT_APP_GOOGLE_CLIENT_ID;
const CLIENT_SECRET = process.env.REACT_APP_GOOGLE_CLIENT_SECRET;

function GoogleLogin(props) {
  const navigate = useNavigate();
  const { userDoesntExist, setUserDoesntExist, path } = props;
  const [newEmail, setNewEmail] = useState("");
  const [accessToken, setAccessToken] = useState("");

  function handleCallBackResponse(response) {
    var userObject = jwt_decode(response.credential);
    if (userObject) {
      let email = userObject.email;
      setNewEmail(email);
      let user_id = "";
      axios
        .get(
          `https://mrle52rri4.execute-api.us-west-1.amazonaws.com/dev/api/v2/UserToken/FINDME/${email}`
        )
        .then((response) => {
          console.log(response["data"]["result"].length);
          if (response["data"]["result"].length === 0) {
            setUserDoesntExist(true);
            return;
          } else {
            setAccessToken(response["data"]["result"][0]["google_auth_token"]);

            user_id = response["data"]["result"][0]["user_uid"];
            var old_at = response["data"]["result"][0]["google_auth_token"];
            var refreshToken =
              response["data"]["result"][0]["google_refresh_token"];

            fetch(
              `https://www.googleapis.com/oauth2/v1/tokeninfo?access_token=${old_at}`,
              {
                method: "GET",
              }
            )
              .then((response) => {
                if (response["status"] === 400) {
                  let authorization_url =
                    "https://accounts.google.com/o/oauth2/token";

                  var details = {
                    refresh_token: refreshToken,
                    client_id: CLIENT_ID,
                    client_secret: CLIENT_SECRET,
                    grant_type: "refresh_token",
                  };

                  var formBody = [];
                  for (var property in details) {
                    var encodedKey = encodeURIComponent(property);
                    var encodedValue = encodeURIComponent(details[property]);
                    formBody.push(encodedKey + "=" + encodedValue);
                  }
                  formBody = formBody.join("&");

                  fetch(authorization_url, {
                    method: "POST",
                    headers: {
                      "Content-Type":
                        "application/x-www-form-urlencoded;charset=UTF-8",
                    },
                    body: formBody,
                  })
                    .then((response) => {
                      return response.json();
                    })
                    .then((responseData) => {
                      return responseData;
                    })
                    .then((data) => {
                      let at = data["access_token"];
                      setAccessToken(at);
                      let url = `https://mrle52rri4.execute-api.us-west-1.amazonaws.com/dev/api/v2/UpdateAccessToken/FINDME/${user_id}`;
                      axios
                        .post(url, {
                          google_auth_token: at,
                        })
                        .then((response) => {})
                        .catch((err) => {
                          console.log(err);
                        });
                      return accessToken;
                    })
                    .catch((err) => {
                      console.log(err);
                    });
                } else {
                  setAccessToken(old_at);
                }
              })
              .catch((err) => {
                console.log(err);
              });
            socialGoogle(email);
          }
        });
    }
  }
  const socialGoogle = async (e) => {
    navigate("/registration-confirmation", {
      state: {
        email: e,
      },
    });
  };

  useEffect(() => {
    /* global google */

    if (window.google) {
      //  initializes the Sign In With Google client based on the configuration object
      google.accounts.id.initialize({
        client_id: CLIENT_ID,
        callback: handleCallBackResponse,
      });
      //    method renders a Sign In With Google button in your web pages.
      google.accounts.id.renderButton(document.getElementById("signInDiv"), {
        type: "icon",
        theme: "outline",
        size: "large",
        text: "signin_with",
        shape: "circle",
      });
      // access tokens
    }
  }, []);

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        margin: "2rem",
      }}
    >
      <div id="signInDiv"></div>
    </div>
  );
}

export default GoogleLogin;
