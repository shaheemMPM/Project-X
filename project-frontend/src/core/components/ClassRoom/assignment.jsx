import "../../../public/Classroom/main.css";
import { useHistory } from "react-router-dom";

const Assignment = (props) => {
  let history = useHistory();
  return (
    <div
      className="assignment lec__card"
      onClick={() => {
        history.push(
          `/class/${props.classId}/assignment/${props.assignment._id}`
        );
      }}
    >
      <h1 className="assignment-title">{props.assignment.title}</h1>
      <h3 className="assignment-mark">Mark : {props.assignment.totalmark}</h3>
      <h3 className="assignment-due">
        Due : {new Date(props.assignment.dueTime).toLocaleDateString()}
      </h3>
    </div>
  );
};

export default Assignment;
