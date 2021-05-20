// modules
import { useHistory } from "react-router-dom";
import Assignment from "./assignment";

const Assignments = (props) => {
  let history = useHistory();

  return (
    <div className="lectures">
      <h1 className="lectures__heading">Assignments</h1>
      <div className="lectures__frame">
        <div className="lectures__frame__inner">
          {props.isAuthor ? (
            <div
              className="lectures__add lec__card"
              onClick={() => {
                history.push(`/class/${props.classId}/upload-assignment`);
              }}
            >
              <h1 className="lectures__add__plus">+</h1>
            </div>
          ) : null}

          <Assignment />
          <Assignment />
          <Assignment />
          <Assignment />
        </div>
      </div>
    </div>
  );
};

export default Assignments;
