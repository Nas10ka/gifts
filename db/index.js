const mongose = require('mongoose');

mongose
  .connect('mongodb://127.0.0.1:27017/gifts')
  .catch(e => {
    console.error('Connection error ', e.message)
  })

const db = mongose.connection;

module.exports = db;