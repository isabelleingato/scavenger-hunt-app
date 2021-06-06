import './Nav.css';

function Nav({ author, player }) {
  return (
    <nav>
        <img src={process.env.PUBLIC_URL + '/logo192.png'} alt="logo" />
    </nav>
  );
}

export default Nav;
