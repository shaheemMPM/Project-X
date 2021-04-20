import Assignment from './assignment';

function Assignments() {
  return (
    <div className="lectures">
      <h1 className="lectures__heading">Assignments</h1> 
      <div className="lectures__frame">
        <div className="lectures__frame__inner">

          <div className="lectures__add lec__card">
            <h1 className="lectures__add__plus">+</h1>
          </div>

          <Assignment />
          <Assignment />
          <Assignment />
          <Assignment />

        </div>
      </div>   
    </div>
  );
}

export default Assignments;