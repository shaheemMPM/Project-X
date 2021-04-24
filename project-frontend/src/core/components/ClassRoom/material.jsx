import '../../../public/Classroom/main.css';
import pdf from '../../../public/Classroom/file-pdf.png';

const Material = () => {
  return (
    <div className="material lec__card">
      <img className="material-file-icon" src={pdf} alt="pdf" />
      <h1 className="material-file-name">Introduction to Data Mining</h1>
    </div>
  );
}

export default Material;