// modules
import { useHistory } from "react-router-dom";
import Material from "./material";

const Materials = (props) => {
  let history = useHistory();

  return (
    <div className="lectures">
      <h1 className="lectures__heading">Materials</h1>
      <div className="lectures__frame">
        <div className="lectures__frame__inner">
          {props.isAuthor ? (
            <div
              className="lectures__add lec__card"
              onClick={() => {
                history.push(`/class/${props.classId}/upload-material`);
              }}
            >
              <h1 className="lectures__add__plus">+</h1>
            </div>
          ) : null}
          {props.materials
            ? props.materials.map((el, ind) => {
                return (
                  <Material key={ind} material={el} classId={props.classId} />
                );
              })
            : null}
        </div>
      </div>
    </div>
  );
};

export default Materials;
