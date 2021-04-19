// Components
import Nav from '../core/components/Home/nav';
import Classroom from '../core/components/Home/classroom';

import '../public/Home/css/classrooms.css';

function Home() {
  return (
    <>
      <Nav />
      <section className="classrooms">
        <div className="classrooms__inner">
          <Classroom />
          <Classroom />
          <Classroom />
        </div>
      </section>
    </>
  );
}

export default Home;