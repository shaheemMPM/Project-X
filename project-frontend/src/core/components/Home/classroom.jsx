// styles
import "../../../public/Home/css/classrooms.css";

// import bg from "../../../public/Home/images/img_code.png";
import user from "../../../public/Home/images/user.png";

const Classroom = (props) => {
  return (
    <div className="card__classroom" onClick={props.expand}>
      <div
        className="classroom__card__top"
        style={{ backgroundImage: `url(${props.bg})` }}
      >
        <h1 className="classroom__course">{props.title}</h1>
        <h3 className="classroom__code">{props.subtitle}</h3>
        <h3 className="classroom__teacher">{props.owner}</h3>
      </div>
      <div
        className="classroom_teacher_dp"
        style={{ backgroundImage: `url(${user})` }}
      ></div>
    </div>
  );
};

export default Classroom;
