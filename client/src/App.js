import './App.css';
import Nav from './Nav';
import Hunt from './Hunt';
import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { useQuery, gql } from '@apollo/client';

// TODO: Add auth
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

// https://reactjs.org/docs/code-splitting.html#route-based-code-splitting
function App() {
  const { loading, error, data } = useQuery(QUERY);
  console.log(loading, error, data);
  return (
    <div className="App">
      <header className="App-header">
        <p>Welcome to your Scavenger Hunt hub. Here you can see all the scavenger hunts which you are leading and in which you are participating. Good luck searching!</p>
      </header>
      <Nav author={data?.author} player={data?.player}></Nav>
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
