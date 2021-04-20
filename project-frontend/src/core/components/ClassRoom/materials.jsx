import Material from './material';

function Materials() {
  return (
    <div className="lectures">
      <h1 className="lectures__heading">Materials</h1> 
      <div className="lectures__frame">
        <div className="lectures__frame__inner">

          <div className="lectures__add lec__card">
            <h1 className="lectures__add__plus">+</h1>
          </div>

          <Material />
          <Material />
          <Material />
          <Material />

        </div>
      </div>   
    </div>
  );
}

export default Materials;