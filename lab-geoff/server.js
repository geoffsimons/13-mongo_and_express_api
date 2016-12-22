'use strict';

const express = require('express');
const debug = require('debug')('mnp:server');
const Promise = require('bluebird');
const mongoose = require('mongoose');

const app = express();
const PORT = process.env.PORT || 4567;

const MONGODB_URI = 'mongodb://localhost/mnp';
mongoose.Promise = Promise;

module.exports = exports = {};

exports.start = function() {
  return new Promise( (resolve, reject) => {
    mongoose.connect(MONGODB_URI)
    .then( () => {
      debug('Mongoose connected:', MONGODB_URI);
    })
    .then(app.listen(PORT))
    .then( () => {
      debug('Server up:', PORT);
      resolve();
    })
    .catch( err => reject(err));
  });
};

exports.PORT = PORT;
