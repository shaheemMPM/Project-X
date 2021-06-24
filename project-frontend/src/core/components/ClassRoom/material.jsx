import "../../../public/Classroom/main.css";
import pdf from "../../../public/Classroom/file-pdf.png";

const Material = (props) => {
  return (
    <a
      href={`http://localhost:8000/${props.material.url}`}
      target="_blank"
      rel="noreferrer"
    >
      <div className="material lec__card">
        <img className="material-file-icon" src={pdf} alt="pdf" />
        <h1 className="material-file-name">{props.material.title}</h1>
      </div>
    </a>
  );
};

export default Material;
