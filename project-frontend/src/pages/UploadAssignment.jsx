// Components
import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import Nav from "../core/components/UploadItem/nav";
// import style
import "../public/UploadItem/main.css";
import swal from "sweetalert";
import axios from "axios";
import MoonLoader from "react-spinners/MoonLoader";

const UploadAssignment = (props) => {
  const classId = props.match.params.id;
  const [isLoading, setIsLoading] = useState(false);
  const [token, setToken] = useState(null);
  const [title, setTitle] = useState("");
  const [chapter, setChapter] = useState("");
  const [totalMark, setTotalMark] = useState("");
  const [dueTime, setDueTime] = useState("");
  const [description, setDescription] = useState("");

  let history = useHistory();

  useEffect(() => {
    let authData = JSON.parse(sessionStorage.getItem("auth_data"));
    setToken(authData);
    // eslint-disable-next-line
  }, []);

  const uploadAssignmentHandler = (event) => {
    event.preventDefault();
    if (title && dueTime && totalMark) {
      setIsLoading(true);
      const POST_URL = "https://localhost:8883/api/v1/assignment";
      const header_config = {
        headers: { Authorization: `Bearer ${token.token}` },
        "Content-Type": "multipart/form-data",
      };
      axios
        .post(
          POST_URL,
          {
            title,
            description,
            chapter,
            classroom: classId,
            dueTime: Number(new Date(dueTime)),
            totalmark: totalMark,
          },
          header_config
        )
        .then(() => {
          history.push(`/class/${classId}`);
        })
        .catch((error) => {
          swal("Error", error.response.data.message, "error");
        });
    } else {
      swal("", "Fill all required fields", "info");
    }
  };

  let content;
  if (isLoading) {
    content = (
      <MoonLoader
        css={{ display: "block", margin: "25vh auto", borderColor: "red" }}
        size={150}
        color={"#FF0000"}
        loading={true}
      />
    );
  } else {
    content = (
      <>
        <Nav />
        <div className="upload-lecture">
          <h1 className="upload-header">Post Assignment</h1>

          <form className="login100-form ">
            <div className="wrap-input100">
              <span className="label-input100">Title</span>
              <input
                className="input100"
                type="text"
                name="name"
                placeholder="Title..."
                onChange={(e) => {
                  setTitle(e.target.value);
                }}
              />
              <span className="focus-input100"></span>
            </div>

            <div className="ip-bouded">
              <div className="ip-outer chapter-outer">
                <div className="wrap-input100">
                  <span className="label-input100">Chapter</span>
                  <input
                    className="input100"
                    type="text"
                    name="username"
                    placeholder="Chapter Name..."
                    onChange={(e) => {
                      setChapter(e.target.value);
                    }}
                  />
                  <span className="focus-input100"></span>
                </div>
              </div>
              <div className="ip-outer mark-outer">
                <div className="wrap-input100">
                  <span className="label-input100">Mark</span>
                  <input
                    className="input100"
                    type="text"
                    name="username"
                    placeholder="Total Mark..."
                    onChange={(e) => {
                      setTotalMark(e.target.value);
                    }}
                  />
                  <span className="focus-input100"></span>
                </div>
              </div>
            </div>

            <div className="wrap-input100">
              <span className="label-input100">Description</span>
              <textarea
                className="input100 desc-textarea"
                placeholder="Description..."
                onChange={(e) => {
                  setDescription(e.target.value);
                }}
              ></textarea>
              <span className="focus-input100"></span>
            </div>

            <div className="wrap-input100">
              <span className="label-input100">Due Date</span>
              <input
                className="input100"
                type="datetime-local"
                name="duedate"
                onChange={(e) => {
                  setDueTime(e.target.value);
                }}
              />
              <span className="focus-input100"></span>
            </div>

            <div className="container-login100-form-btn">
              <div className="wrap-login100-form-btn">
                <div className="login100-form-bgbtn"></div>
                <button
                  className="login100-form-btn upload-button"
                  onClick={uploadAssignmentHandler}
                >
                  Upload
                </button>
              </div>
            </div>
          </form>
        </div>
      </>
    );
  }

  return content;
};

export default UploadAssignment;
