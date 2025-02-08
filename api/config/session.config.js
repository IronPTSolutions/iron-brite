const expressSession = require('express-session');
const MongoStore = require('connect-mongo');
const mongoose = require('mongoose');

const sessionMaxDays = parseInt(process.env.SESSION_MAX_DAYS || '1');

module.exports.loadSession = expressSession({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: {
    httpOnly: true,
    secure: process.env.SESSION_SECURE === 'true',
    maxAge: sessionMaxDays * 24 * 60 * 60 * 1000
  },
  store: MongoStore.create({
    mongoUrl: process.env.MONGODB_URI,
    ttl: sessionMaxDays * 24 * 60 * 60
  })
});