import React, { useState, useEffect, useContext } from "react";
import jwt_decode from "jwt-decode";
import axios from "axios";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import LoginContext from "../../LoginContext";

const CLIENT_ID = process.env.REACT_APP_GOOGLE_CLIENT_ID;
const CLIENT_SECRET = process.env.REACT_APP_GOOGLE_CLIENT_SECRET;
const GOOGLE_LOGIN = process.env.REACT_APP_GOOGLE_LOGIN;
let SCOPES =
  "https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/calendar.events https://www.googleapis.com/auth/userinfo.profile ";

function GoogleLogin(props) {
  const loginContext = useContext(LoginContext);
  const navigate = useNavigate();
  const {
    userDoesntExist,
    setUserDoesntExist,
    path,
    errorMessage,
    setErrorMessage,
  } = props;
  const eventObj = props.eventObj !== undefined ? props.eventObj : "";
  console.log(eventObj);
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [socialId, setSocialId] = useState("");
  const [accessToken, setAccessToken] = useState("");
  const [refreshToken, setRefreshToken] = useState("");
  const [accessExpiresIn, setAccessExpiresIn] = useState("");
  let codeClient = {};
  function getAuthorizationCode() {
    // Request authorization code and obtain user consent,  method of the code client to trigger the user flow
    codeClient.requestCode();
  }

  // function handleCallBackResponse(response) {
  //   var userObject = jwt_decode(response.credential);
  //   if (userObject) {
  //     let email = userObject.email;
  //     setEmail(email);
  //     let user_id = "";
  //     let user = [];
  //     axios
  //       .get(
  //         `https://mrle52rri4.execute-api.us-west-1.amazonaws.com/dev/api/v2/UserSocialLogin/FINDME/${email}`
  //       )
  //       .then((response) => {
  //         if (response["data"]["message"] === "Email ID doesnt exist") {
  //           // setUserDoesntExist(true);
  //           getAuthorizationCode();

  //           return;
  //         } else if (response["data"]["message"] === "Login with email") {
  //           setErrorMessage(response["data"]["message"]);
  //         } else {
  //           user = response.data.result;
  //           setAccessToken(response.data.result.google_auth_token);

  //           user_id = response.data.result.user_uid;
  //           var old_at = response.data.result.google_auth_token;
  //           var refreshToken = response.data.result.google_refresh_token;

  //           fetch(
  //             `https://www.googleapis.com/oauth2/v1/tokeninfo?access_token=${old_at}`,
  //             {
  //               method: "GET",
  //             }
  //           )
  //             .then((response) => {
  //               if (response["status"] === 400) {
  //                 let authorization_url =
  //                   "https://accounts.google.com/o/oauth2/token";

  //                 var details = {
  //                   refresh_token: refreshToken,
  //                   client_id: CLIENT_ID,
  //                   client_secret: CLIENT_SECRET,
  //                   grant_type: "refresh_token",
  //                 };

  //                 var formBody = [];
  //                 for (var property in details) {
  //                   var encodedKey = encodeURIComponent(property);
  //                   var encodedValue = encodeURIComponent(details[property]);
  //                   formBody.push(encodedKey + "=" + encodedValue);
  //                 }
  //                 formBody = formBody.join("&");

  //                 fetch(authorization_url, {
  //                   method: "POST",
  //                   headers: {
  //                     "Content-Type":
  //                       "application/x-www-form-urlencoded;charset=UTF-8",
  //                   },
  //                   body: formBody,
  //                 })
  //                   .then((response) => {
  //                     return response.json();
  //                   })
  //                   .then((responseData) => {
  //                     return responseData;
  //                   })
  //                   .then((data) => {
  //                     let at = data["access_token"];
  //                     setAccessToken(at);
  //                     let url = `https://mrle52rri4.execute-api.us-west-1.amazonaws.com/dev/api/v2/UpdateAccessToken/FINDME/${user_id}`;
  //                     axios
  //                       .post(url, {
  //                         google_auth_token: at,
  //                       })
  //                       .then((response) => {})
  //                       .catch((err) => {
  //                         console.log(err);
  //                       });
  //                     return accessToken;
  //                   })
  //                   .catch((err) => {
  //                     console.log(err);
  //                   });
  //               } else {
  //                 setAccessToken(old_at);
  //               }
  //             })
  //             .catch((err) => {
  //               console.log(err);
  //             });
  //           socialGoogle(email, user);
  //         }
  //       });
  //   }
  // }
  const socialGoogle = async (e, u) => {
    document.cookie = "user_uid=" + u.user_uid;
    document.cookie = "user_email=" + e;
    document.cookie = "user_details=" + JSON.stringify(u);
    document.cookie = "loggedIn=" + true;
    loginContext.setLoginState({
      ...loginContext.loginState,
      reload: false,
      loggedIn: true,
      user_uid: u.user_uid,
      user_email: e,
      user_details: u,
    });
    navigate(path, {
      state: {
        email: e,
        user: u,
        eventObj: eventObj,
      },
    });
  };

  // useEffect(() => {
  //   /* global google */

  //   if (window.google) {
  //     //  initializes the Sign In With Google client based on the configuration object
  //     google.accounts.id.initialize({
  //       client_id: CLIENT_ID,
  //       callback: handleCallBackResponse,
  //     });
  //     //    method renders a Sign In With Google button in your web pages.
  //     google.accounts.id.renderButton(document.getElementById("signInDiv"), {
  //       type: "icon",
  //       theme: "outline",
  //       size: "large",
  //       text: "signin_with",
  //       shape: "circle",
  //     });
  //     // access tokens
  //   }
  // }, []);
  useEffect(() => {
    /* global google */
    console.log(codeClient);
    codeClient = google.accounts.oauth2.initCodeClient({
      client_id: CLIENT_ID,
      scope: SCOPES,
      callback: (tokenResponse) => {
        // gets back authorization code
        if (tokenResponse && tokenResponse.code) {
          let auth_code = tokenResponse.code;
          let authorization_url = "https://accounts.google.com/o/oauth2/token";

          var details = {
            code: auth_code,
            client_id: CLIENT_ID,
            client_secret: CLIENT_SECRET,
            redirectUri: "postmessage",
            grant_type: "authorization_code",
          };
          var formBody = [];
          for (var property in details) {
            var encodedKey = encodeURIComponent(property);
            var encodedValue = encodeURIComponent(details[property]);
            formBody.push(encodedKey + "=" + encodedValue);
          }
          formBody = formBody.join("&");
          // use authorization code, send it to google endpoint to get back ACCESS TOKEN n REFRESH TOKEN
          fetch(authorization_url, {
            method: "POST",
            headers: {
              "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
            },
            body: formBody,
          })
            .then((response) => {
              return response.json();
            })

            .then((data) => {
              let at = data["access_token"];
              let rt = data["refresh_token"];
              let ax = data["expires_in"];
              //  expires every 1 hr
              setAccessToken(at);
              // stays the same and used to refresh ACCESS token
              setRefreshToken(rt);
              setAccessExpiresIn(ax);
              //  use ACCESS token, to get email and other account info
              axios
                .get(
                  "https://www.googleapis.com/oauth2/v2/userinfo?alt=json&access_token=" +
                    at
                )
                .then((response) => {
                  let data = response.data;

                  let e = data["email"];
                  let si = data["id"];

                  setEmail(e);

                  setSocialId(si);

                  axios
                    .get(
                      `https://mrle52rri4.execute-api.us-west-1.amazonaws.com/dev/api/v2/UserSocialLogin/FINDME/${e}`
                    )
                    .then((response) => {
                      if (
                        response["data"]["message"] === "Email ID doesnt exist"
                      ) {
                        const socialGoogle = async () => {
                          const user = {
                            email: e,
                            password: GOOGLE_LOGIN,
                            first_name: data["given_name"],
                            last_name: data["family_name"],
                            role: "",
                            phone_number: phoneNumber,
                            google_auth_token: at,
                            google_refresh_token: rt,
                            social_id: si,
                            access_expires_in: ax,
                          };
                          navigate("/google-signup-form", {
                            state: {
                              user: user,
                              path: path,
                              eventObj: eventObj,
                              email: e,
                            },
                          });
                        };
                        socialGoogle();
                        return;
                      } else if (
                        response["data"]["message"] === "Login with email"
                      ) {
                        setErrorMessage(response["data"]["message"]);
                      } else {
                        let user = response.data.result;
                        let user_id = response.data.result.user_uid;
                        setAccessToken(at);
                        let url = `https://mrle52rri4.execute-api.us-west-1.amazonaws.com/dev/api/v2/UpdateAccessToken/FINDME/${user_id}`;
                        axios
                          .post(url, {
                            google_auth_token: at,
                          })
                          .then((response) => {
                            socialGoogle(email, user);
                          })
                          .catch((err) => {
                            console.log(err);
                          });
                        return accessToken;
                      }
                    });
                })
                .catch((error) => {
                  console.log(error);
                });
              return (
                accessToken, refreshToken, accessExpiresIn, email, socialId
              );
            })
            .catch((err) => {
              console.log(err);
            });
        }
      },
    });
  }, [getAuthorizationCode]);
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        margin: "2rem",
      }}
    >
      <div className="w-100">
        <div></div>
        <div>
          <div></div>
          <div id="signUpDiv">
            <Button
              onClick={() => getAuthorizationCode()}
              role="button"
              style={{ textTransform: "none", borderRadius: "50px" }}
            >
              <img
                style={{
                  width: "2rem",
                }}
                alt="Google sign-up"
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/512px-Google_%22G%22_Logo.svg.png"
              />
            </Button>
          </div>
        </div>
        <div></div>
      </div>
    </div>
  );
}

export default GoogleLogin;
