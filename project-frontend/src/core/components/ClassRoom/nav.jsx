import "../../../public/Home/css/nav.css";
import { useHistory } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
const videoConferenceUrl = `https://${window.location.hostname}:4443/`;


const Nav = (props) => {
  let history = useHistory();
  const classId = props.classId;

  const [token, setToken] = useState(null);
  const [isDropped, setIsDropped] = useState(false);

  useEffect(() => {
    let authData = JSON.parse(sessionStorage.getItem("auth_data"));
    authData.classId = classId;
    setToken(authData);
    // eslint-disable-next-line
  }, []);

  const logout = (e) => {
    e.preventDefault();
    sessionStorage.setItem("auth_data", "");
    window.location.pathname = "/";
  };

  const joinConference = () => {
    const newWindow = window.open(videoConferenceUrl+props.liveClassId, JSON.stringify(token), 'noopener,noreferrer');
    if (newWindow) {
      newWindow.opener = null;
    }
  }

  const openConference = () => {
    const newWindow = window.open(videoConferenceUrl+props.liveClassId, JSON.stringify(token), 'noopener,noreferrer');
    const POST_URL = "https://localhost:8883/api/v1/classroom/startLive";
    const header_config = {
      headers: { Authorization: `Bearer ${token.token}` },
    };
    axios
      .post(
        POST_URL,
        {
          "classId": classId,
          "isClassLive": true
        },
        header_config
      )
    if (newWindow) {
      newWindow.opener = null;
    }
  }

  return (
    <nav className="nav" role="navigation">
      <div className="nav__left">
        <h1
          onClick={() => {
            history.push("/");
          }}
        >
          Project-X
        </h1>
      </div>
      <div className="nav__right">
        {props.isAuthor ? 
          <button 
            className="btn__join" 
            onClick={()=>{openConference();}}
          >Live</button> 
        : 
          props.isClassLive ?
            <button 
              className="btn__join" 
              onClick={()=>{joinConference();}}
            >Join Class</button> 
            : false
          
        }
        <div className="dropdown">
          <button
            className="btn__user dropbtn"
            onClick={() => {
              setIsDropped(!isDropped);
            }}
          >
            <span>{token?.username[0] || ".."}</span>
          </button>
          <div
            className="dropdown-content"
            style={{ display: isDropped ? "block" : "none" }}
          >
            <a href="/#">Hey {token?.username}</a>
            <hr style={{ margin: "0", padding: "0" }} />
            <a href="/#" onClick={logout}>
              Logout
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Nav;
