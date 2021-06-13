import './Nav.css';

function Nav({ author }) {
  return (
    <nav>
        <img src={process.env.PUBLIC_URL + '/logo192.png'} alt="logo" />
        Good day, {author.name}!
        <ul>
            <li>Create a Hunt</li>
            <li>Share a Hunt</li>
            <li>Hunts I've Created</li>
            <li>My Hunt Progress</li>
        </ul>
    </nav>
  );
}

export default Nav;
