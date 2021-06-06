import './App.css';
import Nav from './Nav';
import Hunt from './Hunt';
import { useQuery, gql } from '@apollo/client';

// TODO: Replace with variable
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
        <p></p>
      </header>
      <Nav></Nav>
      <main>
        <div error={error} loading={loading.toString()} data={data}>
          {data?.author?.scavengerHunts?.map((hunt) => (
            <Hunt key={hunt.id} hunt={hunt} />
          ))}
        </div>
      </main>
    </div>
  );
}

export default App;
