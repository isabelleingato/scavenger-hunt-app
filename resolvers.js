const mongoose = require('mongoose');
// TODO: Consider transactions https://mongoosejs.com/docs/transactions.html#with-the-aggregation-framework

const identitySchema = new mongoose.Schema({
  name: String,
  huntsAuthored: [mongoose.ObjectId],
  huntsPlaying: [{
    huntId: mongoose.ObjectId,
    progressId: mongoose.ObjectId
  }],
});
const Identity = mongoose.model('Identity', identitySchema);

// https://www.mongodb.com/blog/post/6-rules-of-thumb-for-mongodb-schema-design-part-2
const huntSchema = new mongoose.Schema({
  title: String,
  instructions: String,
  //author: mongoose.ObjectId,
  //players: [mongoose.ObjectId],
  urls: [{
    url: String,
    points: Number 
  }]
});
const Hunt = mongoose.model('Hunt', huntSchema);

const progressSchema = new mongoose.Schema({
  //huntId: mongoose.ObjectId,
  urls: [String],
});
const Progress = mongoose.model('Progress', progressSchema);

const resolvers = {
    Mutation: {
      createAuthor: async (parent, args, { user, db }) => {
        const doc = new Identity(args);
        await doc.save();
        return doc._id;
      },
      createPlayer: async (parent, args, { user, db }) => {
        const doc = new Identity(args);
        await doc.save();
        return doc._id;
      },
      createHunt: async (parent, args, { user, db }) => {
        const doc = new Hunt(args);
        await doc.save();
        const authorDoc = await Identity.findById(args.author).exec();
        authorDoc.huntsAuthored.push(doc._id);
        await authorDoc.save();
        return doc._id;
      },
      addUrls: async (parent, args, { user, db }) => {
        const doc = await Hunt.findById(args.hunt).exec();
        doc.urls = doc.urls || [];
        doc.urls.push(...args.urls);
        await doc.save();
        return doc._id;
      },
      removeUrls: async (parent, args, { user, db }) => {
        const doc = await Hunt.findById(args.hunt).exec();
        doc.urls = doc.urls || [];
        doc.urls = doc.urls.filter((url) => !args.urls.includes(url.url));
        await doc.save();
        return doc._id;
      },
      addPlayer: async (parent, args, { user, db }) => {
        const doc = await Hunt.findById(args.hunt).exec();
        const progressDoc = new Progress();
        await progressDoc.save();
        const authorDoc = await Identity.findById(args.player).exec();
        authorDoc.huntsPlaying = authorDoc.huntsPlaying || [];
        authorDoc.huntsPlaying.push({ huntId: doc._id, progressId: progressDoc._id });
        await authorDoc.save();
        return doc._id;
      },
      removePlayer: async (parent, args, { user, db }) => {
        const doc = await Hunt.findById(args.hunt).exec();
        const authorDoc = await Identity.findById(args.player).exec();
        const progressIdsToRemove = authorDoc.huntsPlaying.filter((record) => record.huntId === args.hunt).map((record) => record.progressId);
        authorDoc.huntsPlaying = authorDoc.huntsPlaying || [];
        authorDoc.huntsPlaying = authorDoc.huntsPlaying.filter((record) => record.huntId !== arg.hunt);
        await authorDoc.save();
        const progressDoc = new Progress();
        await progressDoc.deleteMany({ _id: {$in: progressIdsToRemove} });
        return doc._id;
      },
      updateProgress: async (parent, args, { user, db }) => {
        const authorDoc = await Identity.findById(args.player).exec();
        authorDoc.huntsPlaying = authorDoc.huntsPlaying || [];
        const progressRecords = authorDoc.huntsPlaying.filter((record) => record.huntId == args.hunt);
        for (let record of progressRecords) {
          const doc = await Progress.findById(record.progressId).exec();
          doc.urls = doc.urls || [];
          doc.urls.push(args.url);
          await doc.save();
        }
        return authorDoc._id;
      },
    },
    Query: {
      author: async (parent, args, { user, db }) => {
        return [];
      },
      player: async (parent, args, { user, db }) => {
        return [];
      },
    },
    Author: {
      scavengerHunts: async (parent, args, { user, db }) => {
        return [];
      },
    },
    Player: {
      scavengerHunts: async (parent, args, { user, db }) => {
        return [];
      },
      progress: async (parent, args, { user, db }) => {
        return [];
      },
    },
    ScavengerHunt: {
      author: async (parent, args, { user, db }) => {
        return null;
      },
      urls: async (parent, args, { user, db }) => {
        return [];
      },
      players: async (parent, args, { user, db }) => {
        return [];
      },
      finishers: async (parent, args, { user, db }) => {
        return null;
      }
    },
};

module.exports = resolvers;
  