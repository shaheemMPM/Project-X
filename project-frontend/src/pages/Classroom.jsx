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
  const [lectures, setLectures] = useState(null);
  const [materials, setMaterials] = useState(null);
  const [assignments, setAssignments] = useState(null);

  useEffect(() => {
    let authData = JSON.parse(sessionStorage.getItem("auth_data"));
    setToken(authData);
    // eslint-disable-next-line
  }, []);

  const getClassroomData = () => {
    if (!token) {
      return;
    }
    const GET_URL = `https://localhost:8883/api/v1/classroom/${classId}`;
    const header_config = {
      headers: { Authorization: `Bearer ${token.token}` },
    };
    axios
      .get(GET_URL, header_config)
      .then((response) => {
        setClassData(response.data.data);
      })
      .catch((error) => {
        swal("Error", error.response.data.message, "error");
      });
  };

  const getLectures = () => {
    if (!token) {
      return;
    }
    const GET_URL = `https://localhost:8883/api/v1/lecture/class/${classId}`;
    const header_config = {
      headers: { Authorization: `Bearer ${token.token}` },
    };
    axios
      .get(GET_URL, header_config)
      .then((response) => {
        if(response.data)
          setLectures(response.data.data);
      })
      .catch((error) => {
        swal("Error", error.response.data.message, "error");
      });
  };

  const getMaterials = () => {
    if (!token) {
      return;
    }
    const GET_URL = `https://localhost:8883/api/v1/material/class/${classId}`;
    const header_config = {
      headers: { Authorization: `Bearer ${token.token}` },
    };
    axios
      .get(GET_URL, header_config)
      .then((response) => {
        if(response.data)
          setMaterials(response.data.data);
      })
      .catch((error) => {
        swal("Error", error.response.data.message, "error");
      });
  };

  const getAssignments = () => {
    if (!token) {
      return;
    }
    const GET_URL = `https://localhost:8883/api/v1/assignment/class/${classId}`;
    const header_config = {
      headers: { Authorization: `Bearer ${token.token}` },
    };
    axios
      .get(GET_URL, header_config)
      .then((response) => {
        if(response.data)
          setAssignments(response.data.data);
      })
      .catch((error) => {
        swal("Error", error.response.data.message, "error");
      });
  };

  useEffect(
    () => {
      getClassroomData();
      getLectures();
      getMaterials();
      getAssignments();
    },
    // eslint-disable-next-line
    [token]
  );

  return (
    <>
      {!!classData ? (
        <>
          <Nav 
            isAuthor={classData.createdBy === token.username} 
            liveClassId={classData.liveClassId} 
            classId={classId}
            isClassLive={classData.isClassLive}
          />
          <section className="classroom">
            <Lectures
              isAuthor={classData.createdBy === token.username}
              lectures={lectures}
              classId={classId}
            />
            <Materials
              isAuthor={classData.createdBy === token.username}
              materials={materials}
              classId={classId}
            />
            <Assignments
              isAuthor={classData.createdBy === token.username}
              assignments={assignments}
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
