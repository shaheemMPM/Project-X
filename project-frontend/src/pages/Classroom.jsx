// Components
import Nav from '../core/components/ClassRoom/nav';
import Lectures from '../core/components/ClassRoom/lectures';
import Materials from '../core/components/ClassRoom/materials';
import Assignments from '../core/components/ClassRoom/assignments';
// import style
import '../public/Classroom/main.css';

const Classroom = () => {
  return (
    <>
      <Nav />
      <section className="classroom">

        <Lectures />
        <Materials />
        <Assignments />

      </section>
    </>
  );
}

export default Classroom;