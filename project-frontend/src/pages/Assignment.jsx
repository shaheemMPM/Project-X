// Components
import { useState, useEffect } from "react";
import Nav from "../core/components/UploadItem/nav";
// import style
import "../public/UploadItem/main.css";
import swal from "sweetalert";
import axios from "axios";
import MoonLoader from "react-spinners/MoonLoader";

const Assignment = (props) => {
  // const classId = props.match.params.id;
  const assignmentId = props.match.params.aid;
  const [isLoading, setIsLoading] = useState(true);
  const [assignment, setAssignment] = useState(null);
  const [token, setToken] = useState(null);

  useEffect(() => {
    let authData = JSON.parse(sessionStorage.getItem("auth_data"));
    setToken(authData);
    // eslint-disable-next-line
  }, []);

  const getAssignment = () => {
    if (!token) {
      return;
    }
    const GET_URL = `http://localhost:8000/api/v1/assignment/${assignmentId}`;
    const header_config = {
      headers: { Authorization: `Bearer ${token.token}` },
    };
    axios
      .get(GET_URL, header_config)
      .then((response) => {
        setAssignment(response.data.data);
        setIsLoading(false);
      })
      .catch((error) => {
        swal("Error", error.message, "error");
      });
  };

  useEffect(
    () => {
      getAssignment();
    },
    // eslint-disable-next-line
    [token]
  );

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
          <h1 className="upload-header">{assignment.title}</h1>
          <div className="row" style={{ marginBottom: "20px" }}>
            <div className="col-12" style={{ marginBottom: "10px" }}>
              <strong>Statement</strong>
            </div>
            <div className="col-12">{assignment.description}</div>
          </div>
          <div className="row" style={{ marginBottom: "20px" }}>
            <div className="col-3">
              <strong>Chapter</strong>
            </div>
            <div className="col-3">{assignment.chapter}</div>
            <div className="col-3">
              <strong>Mark</strong>
            </div>
            <div className="col-3">{assignment.totalmark}</div>
          </div>
          <div className="row" style={{ marginBottom: "20px" }}>
            <div className="col-3">
              <strong>DueTime</strong>
            </div>
            <div className="col-3">
              {new Date(assignment.dueTime).toLocaleString()}
            </div>
          </div>
        </div>
      </>
    );
  }

  return content;
};

export default Assignment;
