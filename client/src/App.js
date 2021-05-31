import './App.css';
import { useQuery, gql } from '@apollo/client';

export const QUERY = gql`
  query Author {
    author(id: "60b545477a42b709812036b5") {
      id
      name
      scavengerHunts {
        title
        instructions
        urls {
          url
          points
        }
        __typename
        id
      }
      __typename
    }
  }
`;

function App() {
  const { loading, error, data } = useQuery(QUERY);
  console.log(loading, error, data);
  return (
    <div className="App">
      <header className="App-header">
        <img src={process.env.PUBLIC_URL + '/logo192.png'} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        <div error={error} loading={loading.toString()} data={data}>
          {/* Add stuff here */}
      </div>
      </header>
    </div>
  );
}

export default App;
