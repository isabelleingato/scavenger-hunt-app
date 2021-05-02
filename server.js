// https://github.com/apollographql/apollo-server/tree/main/packages/apollo-server-express
const { ApolloServer } = require('apollo-server');
//const express = require('express');
const typeDefs = require('./schema');
//const mocks = require('./mocks');
const resolvers = require('./resolvers');
//const passport = require('passport');
//const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
// TODO: Or consider https://github.com/GraphQLGuide/apollo-datasource-mongodb/
const mongoose = require('mongoose');
//db.on('error', console.error.bind(console, 'connection error:'));
//db.once('open', () => console.log('mongoose connection open'));

//const app = express();

/*if (process.env.USE_AUTH) {
  app.use(passport.initialize());
  passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: process.env.GOOGLE_CALLBACK_URL,
  },
    function (accessToken, refreshToken, profile, done) {
      User.findOrCreate({ googleId: profile.id }, function (err, user) {
        return done(err, user);
      });
    }
  ));
  app.use('/graphql', (req, res, next) => {
    passport.authenticate('google', { disableSession: true });
  });
  app.get('/auth/google',
    passport.authenticate('google', { scope: ['https://www.googleapis.com/auth/plus.login'], disableSession: true }));

  app.get('/auth/google/callback',
    passport.authenticate('google', { failureRedirect: '/login', disableSession: true }),
    function (req, res) {
      res.redirect('/');
    });
}*/

const server = new ApolloServer({
  typeDefs,
  //mocks,
  resolvers,
  // https://www.apollographql.com/blog/setting-up-authentication-and-authorization-with-apollo-federation/
  context: async ({ req }) => {
    const db = await mongoose.connect('mongodb://localhost:27017/scavengerhuntapp', { useNewUrlParser: true, useUnifiedTopology: true });
    return { user: (req || {}).user || null, db };
  },
});

//server.start();
//server.applyMiddleware({ app });

server.listen().then(() => console.log('localhost:4000'));
