import '../../../public/Home/css/nav.css';

const Nav = () => {
  return (
    <nav className="nav" role="navigation">
      <div className="nav__left">
        <h1>Project-X</h1>
      </div>
      <div className="nav__right">
        <button className="btn__join">Join</button>
        <button className="btn__create">Create</button>
        <button className="btn__user">
          <span>M</span>
        </button>
      </div>
    </nav>
  );
}

export default Nav;