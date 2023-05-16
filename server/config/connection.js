const mongoose = require('mongoose');

const db = require('./config/connection');

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/foofood', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false,
});

module.exports = mongoose.connection;
