// modules
import { useState, useEffect } from "react";
// import { useHistory } from "react-router-dom";
import swal from "sweetalert";
import axios from "axios";
// Custom Components
import Nav from "../core/components/Home/nav";
import Classroom from "../core/components/Home/classroom";

import "../public/Home/css/classrooms.css";
import bg1 from "../public/Home/images/img_code.png";
import bg2 from "../public/Home/images/img_learnlanguage.png";
import bg3 from "../public/Home/images/img_reachout.png";
import bg4 from "../public/Home/images/img_read.png";
import bg5 from "../public/Home/images/Honors.png";

const Home = () => {
  const [token, setToken] = useState(null);
  const [myClasses, setMyClasses] = useState([]);
  const [joinedClasses, setJoinedClasses] = useState([]);
  const bgList = [bg1, bg2, bg3, bg4, bg5];

  // let history = useHistory();

  useEffect(() => {
    let authData = JSON.parse(sessionStorage.getItem("auth_data"));
    setToken(authData);
    // eslint-disable-next-line
  }, []);

  const getMyClassrooms = () => {
    if (!token) {
      return;
    }
    const GET_URL = "http://localhost:8000/api/v1/classroom/my";
    const header_config = {
      headers: { Authorization: `Bearer ${token.token}` },
    };
    axios
      .get(GET_URL, header_config)
      .then((response) => {
        setMyClasses(response.data.data);
      })
      .catch((error) => {
        swal("Error", error.response.data.message, "error");
      });
  };

  useEffect(getMyClassrooms, [token]);

  return (
    <>
      <Nav />
      <section className="classrooms">
        {myClasses.length > 0 ? (
          <>
            <h1 className="myclass__heading">Created Classes</h1>
            <div className="classrooms__inner">
              {myClasses.map((classroom, ind) => {
                return (
                  <Classroom
                    key={ind}
                    title={classroom.title}
                    subtitle={classroom.subtitle}
                    owner={classroom.createdBy}
                    bg={bgList[ind]}
                  />
                );
              })}
            </div>
          </>
        ) : null}

        {joinedClasses.length > 0 ? (
          <>
            <h1 className="myclass__heading">Joined Classes</h1>
            <div className="classrooms__inner">
              <Classroom
                title={"test"}
                subtitle={"sub title"}
                owner={"owner"}
                bg={bg1}
              />
            </div>
          </>
        ) : null}
      </section>
    </>
  );
};

export default Home;
