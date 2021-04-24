// Components
import Nav from '../core/components/UploadItem/nav';
import ChatFrom from '../core/components/Lecture/chat-from';
import ChatTo from '../core/components/Lecture/chat-to';

import '../public/Lecture/main.css';
import TempVideo from '../public/Lecture/temp.mp4';
import User from '../public/Lecture/user.png';

function Lecture() {
  return (
    <>
      <Nav />
      <section className="lecture-section">
        <div className="lecture-left">
          <video className="video-player" controls>
            <source src={TempVideo} type="video/mp4" />
            Your browser does not support HTML video.
          </video>
          <div className="video-data">
            <h1 className="video-title">C++ Programming | Unordered Maps | Multimap..</h1>
            <p className="video-time">Streamed live on 24 April 2021</p>
            <hr className="hr-title" />
            <p className="content-title">Contents (Auto Generated)</p>
            <ol className="content-list">
              <li className="content-list-item">
                <a href={`${window.location.href}/#`}>00:00  -- Introduction</a>
              </li>
              <li className="content-list-item">
                <a href={`${window.location.href}/#`}>01 : 10  -- Unordered maps</a>
              </li>
              <li className="content-list-item">
                <a href={`${window.location.href}/#`}>05: 00 -- Multimaps  </a>
              </li>
            </ol>
          </div>
        </div>
        <div className="lecture-right">
          <div className="chatbox">
            <div className="chats">

              <ChatFrom img={User} username="mita" text="Hey, can anyone help me with a doubt?" />
              <ChatTo text="Yeah sure, shoot" />
              <ChatFrom img={User} username="mita" text="What is STL Algorithms?" />
              <ChatTo text="STL in C++ is the Standard Templates Library" />
              <ChatFrom img={User} username="mita" text="It was very helpful to get the full form" />
              <ChatTo text="What else did you expected to get?" />
              <ChatFrom img={User} username="mita" text="Explain me what is standard templates library!" />
              <ChatTo text="Well that's what google is for" />
              
            </div>
            <div className="text-send">
              <input type="text" className="ip-type-msg" placeholder="Type a message here..." />
              <button className="btn-send">
                <span className="material-icons ic-btn">send</span>
              </button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Lecture;