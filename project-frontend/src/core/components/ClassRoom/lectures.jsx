// modules
import { useHistory } from "react-router-dom";
// components
import Lecture from "./lecture";

const Lectures = (props) => {
  let history = useHistory();

  return (
    <div className="lectures">
      <h1 className="lectures__heading">Lectures</h1>
      <div className="lectures__frame">
        <div className="lectures__frame__inner">
          {props.isAuthor ? (
            <div
              className="lectures__add lec__card"
              onClick={() => {
                history.push(`/class/${props.classId}/upload-lecture`);
              }}
            >
              <h1 className="lectures__add__plus">+</h1>
            </div>
          ) : null}

          <Lecture />
          <Lecture />
          <Lecture />
          <Lecture />
        </div>
      </div>
    </div>
  );
};

export default Lectures;
