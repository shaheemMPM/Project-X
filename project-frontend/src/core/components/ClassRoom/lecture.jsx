import '../../../public/Classroom/main.css';

import Thumbnail from '../../../public/Classroom/thumbnail.png';

const Lecture = () => {
  return (
    <div className="lectures__lec lec__card" style={{backgroundImage: `url(${Thumbnail})`}}></div>
  );
}

export default Lecture;