// Components
import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import Nav from "../core/components/UploadItem/nav";
import swal from "sweetalert";
import axios from "axios";
// import style
import "../public/UploadItem/main.css";

const UploadLecture = (props) => {
  const classId = props.match.params.id;
  const [token, setToken] = useState(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);

  let history = useHistory();

  useEffect(() => {
    let authData = JSON.parse(sessionStorage.getItem("auth_data"));
    setToken(authData);
    // eslint-disable-next-line
  }, []);

  const uploadLectureHandler = (event) => {
    event.preventDefault();
    if (title && image) {
      let formData = new FormData();
      formData.append("myfile", image);
      formData.append("title", title);
      formData.append("description", description);
      formData.append("classroom", classId);
      const POST_URL = "http://localhost:8000/api/v1/lecture";
      const header_config = {
        headers: { Authorization: `Bearer ${token.token}` },
        "Content-Type": "multipart/form-data",
      };
      axios
        .post(POST_URL, formData, header_config)
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

  return (
    <>
      <Nav />
      <div className="upload-lecture">
        <h1 className="upload-header">UploadLecture</h1>

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

          <div className="wrap-input100 select-file">
            <span className="label-input100 select-file-label">
              Select File
            </span>
            <input
              className="input100"
              type="file"
              name="repeat-pass"
              accept=".mp4"
              onChange={(e) => {
                const file = e.target.files[0];
                setImage(file);
              }}
            />
            <small className="footnote">
              Only select <span>.mp4</span> files
            </small>
          </div>

          <div className="container-login100-form-btn">
            <div className="wrap-login100-form-btn">
              <div className="login100-form-bgbtn"></div>
              <button
                className="login100-form-btn upload-button"
                onClick={uploadLectureHandler}
              >
                Upload
              </button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default UploadLecture;
