// modules
import { useState, useEffect } from "react";
import swal from "sweetalert";
import axios from "axios";
// Components
import Nav from "../core/components/ClassRoom/nav";
import Lectures from "../core/components/ClassRoom/lectures";
import Materials from "../core/components/ClassRoom/materials";
import Assignments from "../core/components/ClassRoom/assignments";
// import style
import "../public/Classroom/main.css";

const Classroom = (props) => {
  const classId = props.match.params.id;
  const [token, setToken] = useState(null);
  const [classData, setClassData] = useState(null);

  useEffect(() => {
    let authData = JSON.parse(sessionStorage.getItem("auth_data"));
    setToken(authData);
    // eslint-disable-next-line
  }, []);

  const getClassroomData = () => {
    if (!token) {
      return;
    }
    const GET_URL = `http://localhost:8000/api/v1/classroom/${classId}`;
    const header_config = {
      headers: { Authorization: `Bearer ${token.token}` },
    };
    axios
      .get(GET_URL, header_config)
      .then((response) => {
        console.log(response.data.data);
        setClassData(response.data.data);
      })
      .catch((error) => {
        swal("Error", error.response.data.message, "error");
      });
  };

  useEffect(getClassroomData, [token]);

  return (
    <>
      {!!classData ? (
        <>
          <Nav isAuthor={classData.createdBy === token.username} />
          <section className="classroom">
            <Lectures
              isAuthor={classData.createdBy === token.username}
              classId={classId}
            />
            <Materials
              isAuthor={classData.createdBy === token.username}
              classId={classId}
            />
            <Assignments
              isAuthor={classData.createdBy === token.username}
              classId={classId}
            />
          </section>
        </>
      ) : (
        <>
          <h4>Loading...</h4>
        </>
      )}
    </>
  );
};

export default Classroom;
