const mongoose = require('mongoose');
const Grid = require('gridfs-stream');
const mongo = mongoose.mongo;

let gfs;

function initGridFS() {
  const conn = mongoose.connection;
  gfs = Grid(conn.db, mongo);
  gfs.collection('uploads');
}

function getGridFS() {
  return gfs;
}

module.exports = { initGridFS, getGridFS };