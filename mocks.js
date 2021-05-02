const { MockList } = require('apollo-server');

const mocks = {
    Query: () => ({
        author: () => {},
        player: () => {},
    }),
    Author: () => ({
        id: () => '1',
        name: () => 'author name',
    }),
    Player: () => ({
        id: () => '1',
        name: () => 'player name',
    }),
    URL: () => ({
        id: () => '1',
        url: () => 'https://www.example.com/',
        points: () => 10,
    }),
    ScavengerHunt: () => ({
        id: () => '1',
        title: () => 'title',
    }),
};

module.exports = mocks;