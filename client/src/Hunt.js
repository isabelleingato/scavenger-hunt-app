import './Hunt.css';

function Hunt({ hunt }) {
  const {
    title,
    instructions,
    urls,
  } = hunt;
  return (
      <div>
        <h2>{title}</h2>
        <p>{instructions}</p>
        <ul className="Hunt">
            {urls?.map((url) => (
                <li>{url.url} - {url.points}</li>
            ))}
        </ul>
    </div>
  );
}

export default Hunt;
