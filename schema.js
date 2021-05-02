const { gql } = require('apollo-server');

const typeDefs = gql`
  type Query {
    author(id: ID!): Author
    player(id: ID!): Player
  }

  input TargetURL {
    url: String!
    points: Int
  }

  type Mutation {
    createAuthor(name: String): ID!
    createPlayer(name: String): ID!
    createHunt(title: String, instructions: String, author: ID!): ID!
    addUrls(hunt: ID!, urls: [TargetURL]): ID!
    removeUrls(hunt: ID!, urls: [String]): ID!
    addPlayer(player: ID!, hunt: ID!): ID!
    removePlayer(player: ID!, hunt: ID!): ID!
    updateProgress(player: ID!, hunt: ID!, url: String): ID!
  }

  type ScavengerHunt {
    id: ID!
    title: String!
    instructions: String!
    author: Author!
    urls: [URL]
    players: [Player]
    finishers: [Player]
  }

  type URL {
    url: String!
    points: Int
  }

  type Author {
    id: ID!
    name: String!
    scavengerHunts: [ScavengerHunt]
  }

  type Progress {
    scavengerHunt: ScavengerHunt
    urlsReached: [URL]
    totalPoints: Int
  }

  type Player {
    id: ID!
    name: String!
    scavengerHunts: [ScavengerHunt]
    progress: [Progress]
  }
`;

module.exports = typeDefs;
