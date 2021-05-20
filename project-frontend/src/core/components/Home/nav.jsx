import "../../../public/Home/css/nav.css";
import { useHistory } from "react-router-dom";
import { useState, useEffect } from "react";

const Nav = () => {
  let history = useHistory();

  const [token, setToken] = useState(null);
  const [isDropped, setIsDropped] = useState(false);

  useEffect(() => {
    let authData = JSON.parse(sessionStorage.getItem("auth_data"));
    setToken(authData);
    // eslint-disable-next-line
  }, []);

  const logout = (e) => {
    e.preventDefault();
    sessionStorage.setItem("auth_data", "");
    window.location.pathname = "/";
  };

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
        <button
          onClick={() => {
            history.push("/join-classroom");
          }}
          className="btn__join"
        >
          Join
        </button>
        <button
          onClick={() => {
            history.push("/create-classroom");
          }}
          className="btn__create"
        >
          Create
        </button>
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
