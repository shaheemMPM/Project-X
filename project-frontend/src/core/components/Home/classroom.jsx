// styles
import '../../../public/Home/css/classrooms.css';

import bg from '../../../public/Home/images/img_code.png';
import user from '../../../public/Home/images/user.png';

function Classroom() {
  return (
    <div className="card__classroom">
      <div className="classroom__card__top" style={{backgroundImage: `url(${bg})`}}>
        <h1 className="classroom__course">Data Mining</h1>
        <h3 className="classroom__code">CS402</h3>
        <h3 className="classroom__teacher">George Mathew</h3>
      </div>
      <div className="classroom_teacher_dp" style={{backgroundImage: `url(${user})`}}>

      </div>
    </div>
  );
}

export default Classroom;