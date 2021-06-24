import "../../../public/Classroom/main.css";
import { useHistory } from "react-router-dom";
import pdf from "../../../public/Classroom/file-video.png";

// import Thumbnail from "../../../public/Classroom/thumbnail.png";

const Lecture = (props) => {
  let history = useHistory();

  return (
    <div
      className="material lec__card"
      onClick={() => {
        history.push(`/class/${props.classId}/lecture/${props.id}`);
      }}
    >
      <img
        className="material-file-icon"
        style={{ width: "92px", height: "92px" }}
        src={pdf}
        alt="pdf"
      />
      <h1 className="material-file-name">{props.lecture.title}</h1>
    </div>
  );
};

export default Lecture;
