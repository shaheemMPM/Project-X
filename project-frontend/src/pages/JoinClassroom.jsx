// Components
import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import swal from "sweetalert";
import axios from "axios";
// custom components
import Nav from "../core/components/UploadItem/nav";
// import style
import "../public/UploadItem/main.css";

const JoinClassroom = () => {
  const [code, setCode] = useState("");
  const [token, setToken] = useState(null);

  let history = useHistory();

  useEffect(() => {
    let authData = JSON.parse(sessionStorage.getItem("auth_data"));
    setToken(authData);
    // eslint-disable-next-line
  }, []);

  const joinClassroomHandler = (e) => {
    e.preventDefault();
    if (!code) {
      swal("", "Enter classroom code", "info");
      return;
    }
    const PATCH_URL = "https://localhost:8883/api/v1/classroom/join";
    const header_config = {
      headers: { Authorization: `Bearer ${token.token}` },
    };
    axios
      .patch(
        PATCH_URL,
        {
          classId: code,
        },
        header_config
      )
      .then((response) => {
        history.push("/");
      })
      .catch((error) => {
        swal("Error", error.response.data.message, "error");
      });
  };

  return (
    <>
      <Nav />
      <div className="upload-lecture">
        <h1 className="upload-header">Join Classroom</h1>
        <form className="login100-form ">
          <div className="wrap-input100">
            <span className="label-input100">Classroom Code*</span>
            <input
              className="input100"
              type="text"
              name="name"
              placeholder="Classroom Code"
              value={code}
              onChange={(e) => {
                setCode(e.target.value);
              }}
            />
            <span className="focus-input100"></span>
          </div>

          <div className="container-login100-form-btn">
            <div className="wrap-login100-form-btn">
              <div className="login100-form-bgbtn"></div>
              <button
                className="login100-form-btn upload-button"
                onClick={joinClassroomHandler}
              >
                Join Classroom
              </button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default JoinClassroom;
