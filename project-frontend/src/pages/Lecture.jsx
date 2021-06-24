// modules
import { useState, useEffect } from "react";
// Components
import Nav from "../core/components/UploadItem/nav";
import ChatFrom from "../core/components/Lecture/chat-from";
import ChatTo from "../core/components/Lecture/chat-to";

import "../public/Lecture/main.css";
import User from "../public/Lecture/user.png";

import swal from "sweetalert";
import axios from "axios";

const Lecture = (props) => {
  const lectureId = props.match.params.lid;
  const [token, setToken] = useState(null);
  const [lecture, setLecture] = useState(null);
  const [isTranscript, setIsTranscript] = useState(false);
  const [isKeywords, setIsKeywords] = useState(false);
  const [text, setText] = useState("");
  const [chat, setChat] = useState(null);

  useEffect(() => {
    let authData = JSON.parse(sessionStorage.getItem("auth_data"));
    setToken(authData);
    // eslint-disable-next-line
  }, []);

  const getLecture = () => {
    if (!token) {
      return;
    }
    const GET_URL = `http://localhost:8000/api/v1/lecture/${lectureId}`;
    const header_config = {
      headers: { Authorization: `Bearer ${token.token}` },
    };
    axios
      .get(GET_URL, header_config)
      .then((response) => {
        setLecture(response.data.data);
      })
      .catch((error) => {
        swal("Error", error.message, "error");
      });
  };

  const getChat = () => {
    if (!token) {
      return;
    }
    const GET_URL = `http://localhost:8000/api/v1/chat/${lectureId}`;
    const header_config = {
      headers: { Authorization: `Bearer ${token.token}` },
    };
    axios
      .get(GET_URL, header_config)
      .then((response) => {
        if (!!response.data.data) {
          setChat(response.data.data.chats);
        }
      })
      .catch((error) => {
        swal("Error", error.message, "error");
      });
  };

  const createChat = () => {
    if (!token) {
      return;
    }
    if (!text) {
      return;
    }
    const POST_URL = `http://localhost:8000/api/v1/chat`;
    const header_config = {
      headers: { Authorization: `Bearer ${token.token}` },
    };
    axios
      .post(
        POST_URL,
        { lectureId, authorName: token.username, authorId: token._id, text },
        header_config
      )
      .then((response) => {
        setText("");
        getChat();
      })
      .catch((error) => {
        swal("Error", error.message, "error");
      });
  };

  useEffect(
    () => {
      getLecture();
      getChat();
    },
    // eslint-disable-next-line
    [token]
  );

  return (
    <>
      <Nav />
      {!!lecture ? (
        <section className="lecture-section">
          <div className="lecture-left">
            <video className="video-player" controls>
              <source
                src={`http://localhost:8000/${lecture.url}`}
                type="video/mp4"
              />
              Your browser does not support HTML video.
            </video>
            <div className="video-data">
              <h1 className="video-title">{lecture.title}</h1>
              <p className="video-time">
                Uploaded on {new Date(lecture.createdAt).toDateString()}
              </p>
              <hr className="hr-title" />
              <p className="video-time" style={{ marginBottom: "20px" }}>
                {lecture.description}
              </p>
              <p className="content-title">
                <button
                  className="btn btn-primary"
                  style={{ marginRight: "20px" }}
                  onClick={() => {
                    setIsTranscript(!isTranscript);
                  }}
                >
                  {isTranscript ? "Hide" : "View"} Transcript
                </button>
                <button
                  className="btn btn-primary"
                  onClick={() => {
                    setIsKeywords(!isKeywords);
                  }}
                >
                  {isKeywords ? "Hide" : "View"} Keywords
                </button>
              </p>
              {isTranscript ? (
                <p style={{ marginTop: "20px" }}>{lecture.transcript}</p>
              ) : null}
              {isKeywords ? (
                <div style={{ marginTop: "20px" }}>
                  {lecture.keywords.map((keyword, ind) => {
                    return (
                      <span
                        key={ind}
                        style={{ color: "#007BFF", marginRight: "25px" }}
                      >
                        #{keyword}
                      </span>
                    );
                  })}
                </div>
              ) : null}
              {/* <ol className="content-list">
                <li className="content-list-item">
                  <a href={`${window.location.href}/#`}>
                    00:00 -- Introduction
                  </a>
                </li>
                <li className="content-list-item">
                  <a href={`${window.location.href}/#`}>
                    01 : 10 -- Unordered maps
                  </a>
                </li>
                <li className="content-list-item">
                  <a href={`${window.location.href}/#`}>05: 00 -- Multimaps </a>
                </li>
              </ol> */}
            </div>
          </div>
          <div className="lecture-right">
            <div className="chatbox">
              <div className="chats">
                {!!chat
                  ? chat.map((el, ind) => {
                      return el.authorName === token.username ? (
                        <ChatTo text={el.text} key={ind} />
                      ) : (
                        <ChatFrom
                          img={User}
                          username={el.authorName}
                          text={el.text}
                          key={ind}
                        />
                      );
                    })
                  : null}
              </div>
              <div className="text-send">
                <input
                  type="text"
                  className="ip-type-msg"
                  placeholder="Type a message here..."
                  onChange={(e) => {
                    setText(e.target.value);
                  }}
                />
                <button className="btn-send" onClick={createChat}>
                  <span className="material-icons ic-btn">send</span>
                </button>
              </div>
            </div>
          </div>
        </section>
      ) : null}
    </>
  );
};

export default Lecture;
