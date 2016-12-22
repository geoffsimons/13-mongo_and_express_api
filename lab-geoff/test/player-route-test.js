'use strict';

const expect = require('chai').expect;
const request = require('superagent');
const Player = require('../model/player.js');

const server = require('../server.js');

const url = `http://localhost:${server.PORT}/api/player`;

const examplePlayer = {
  name: 'Joe Player',
  email: 'joe@foo.bar'
};

describe('Player Routes', function() {
  before( done => {
    server.start()
    .then(done)
    .catch(done);
  });

  describe('POST /api/player', function() {
    after( done => {
      if(!this.tempPlayer) return done();
      Player.remove({})
      .then( () => done())
      .catch(done);
    });
    describe('with a valid body', () => {
      it('should create a player', done => {
        request.post(url)
        .send(examplePlayer)
        .end( (err, res) => {
          expect(res.status).to.equal(201);
          this.tempPlayer = res.body;
          done();
        });
      });
    }); //valid body
    describe('with a missing name', () => {
      it('should return 400', done => {
        request.post(url)
        .send({ email: 'a@b.c' })
        .end( (err, res) => {
          expect(res.status).to.equal(400);
          done();
        });
      });
    });

  }); // POST /api/player


});
