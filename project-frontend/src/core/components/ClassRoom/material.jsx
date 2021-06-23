import "../../../public/Classroom/main.css";
import { useHistory } from "react-router-dom";
import pdf from "../../../public/Classroom/file-pdf.png";

const Material = (props) => {
  let history = useHistory();
  return (
    <div
      className="material lec__card"
      onClick={() => {
        history.push(`/class/${props.classId}/material/${props.material._id}`);
      }}
    >
      <img className="material-file-icon" src={pdf} alt="pdf" />
      <h1 className="material-file-name">{props.material.title}</h1>
    </div>
  );
};

export default Material;
