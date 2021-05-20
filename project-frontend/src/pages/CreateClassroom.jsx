// Components
import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import swal from "sweetalert";
import axios from "axios";
// custom components
import Nav from "../core/components/UploadItem/nav";
// import style
import "../public/UploadItem/main.css";

const CreateClassroom = () => {
  const [title, setTitle] = useState("");
  const [token, setToken] = useState(null);
  const [subtitle, setSubTitle] = useState("");
  const [credit, setCredit] = useState("");
  const [description, setDescription] = useState("");

  let history = useHistory();

  useEffect(() => {
    let authData = JSON.parse(sessionStorage.getItem("auth_data"));
    setToken(authData);
    // eslint-disable-next-line
  }, []);

  const createClassroomHandler = (e) => {
    e.preventDefault();
    if (!title || !subtitle) {
      swal("", "Fill all required fields", "info");
      return;
    }
    const POST_URL = "http://localhost:8000/api/v1/classroom";
    const header_config = {
      headers: { Authorization: `Bearer ${token.token}` },
    };
    axios
      .post(
        POST_URL,
        {
          title,
          subtitle,
          credit,
          description,
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
        <h1 className="upload-header">Create Classroom</h1>

        <form className="login100-form ">
          <div className="wrap-input100">
            <span className="label-input100">Title*</span>
            <input
              className="input100"
              type="text"
              name="name"
              placeholder="Title..."
              value={title}
              onChange={(e) => {
                setTitle(e.target.value);
              }}
            />
            <span className="focus-input100"></span>
          </div>

          <div className="ip-bouded">
            <div className="ip-outer chapter-outer">
              <div className="wrap-input100">
                <span className="label-input100">Sub Title*</span>
                <input
                  className="input100"
                  type="text"
                  name="subtitle"
                  placeholder="Sub Title..."
                  value={subtitle}
                  onChange={(e) => {
                    setSubTitle(e.target.value);
                  }}
                />
                <span className="focus-input100"></span>
              </div>
            </div>
            <div className="ip-outer mark-outer">
              <div className="wrap-input100">
                <span className="label-input100">Credit</span>
                <input
                  className="input100"
                  type="text"
                  name="credit"
                  placeholder="Classroom Credit..."
                  value={credit}
                  onChange={(e) => {
                    setCredit(e.target.value);
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
              name="description"
              placeholder="Description..."
              value={description}
              onChange={(e) => {
                setDescription(e.target.value);
              }}
            ></textarea>
            <span className="focus-input100"></span>
          </div>

          <div className="container-login100-form-btn">
            <div className="wrap-login100-form-btn">
              <div className="login100-form-bgbtn"></div>
              <button
                className="login100-form-btn upload-button"
                onClick={createClassroomHandler}
              >
                Create Classroom
              </button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default CreateClassroom;
