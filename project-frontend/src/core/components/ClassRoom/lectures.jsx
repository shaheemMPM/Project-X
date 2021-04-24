import Lecture from './lecture';

const Lectures = () => {
  return (
    <div className="lectures">
      <h1 className="lectures__heading">Lectures</h1> 
      <div className="lectures__frame">
        <div className="lectures__frame__inner">

          <div className="lectures__add lec__card">
            <h1 className="lectures__add__plus">+</h1>
          </div>

          <Lecture />
          <Lecture />
          <Lecture />
          <Lecture />

        </div>
      </div>   
    </div>
  );
}

export default Lectures;