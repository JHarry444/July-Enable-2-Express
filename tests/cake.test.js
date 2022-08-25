/* eslint-disable no-underscore-dangle */
const chai = require('chai');
const chaiHTTP = require('chai-http');

chai.use(chaiHTTP);
const { expect } = chai;

const { describe, it, after, before } = require('mocha');

const mongoose = require('mongoose');
const Cake = require('../db');

const server = require('../index');

describe('CRUD Testing', () => {
  let testCake;

  after(async () => {
    await mongoose.disconnect();
  });

  before(async () => {
    await Cake.deleteMany({});
    testCake = await Cake.create({
      name: 'Fairy Cake',
      cost: 3.40,
      amount: 2,
    });
    testCake = JSON.parse(JSON.stringify(testCake));
  });

  it('should create a cake', (done) => {
    const newCake = {
      name: 'Madeira',
      amount: 12,
      cost: 10.00,
    };
    chai.request(server).post('/cakes/createCake').send(newCake).end((err, res) => {
      expect(err).to.be.null;
      expect(res.status).to.equal(201);
      expect(res.body).to.include(newCake);
      expect(res.body._id).to.not.be.null;

      return done();
    });
  });

  it('should find a cake', (done) => {
    chai.request(server).get(`/cakes/getCake/${testCake._id}`).end((err, res) => {
      expect(err).to.be.null;
      expect(res.status).to.equal(200);
      expect(res.body).to.deep.equal(testCake);
      return done();
    });
  });

  it('should find cakes', (done) => {
    chai.request(server).get('/cakes/getAllCakes').end((err, res) => {
      expect(err).to.be.null;
      expect(res.status).to.equal(200);
      expect(res.body).to.have.lengthOf(1);
      expect(res.body[0]).to.deep.equal(testCake);
      return done();
    });
  });

  it('should update a cake', (done) => {
    chai.request(server).patch(`/cakes/updateCake/${testCake._id}`).query({ name: 'Jaffa' }).end((err, res) => {
      expect(err).to.be.null;
      expect(res.status).to.equal(200);
      expect(res.body).to.include(testCake);

      return done();
    });
  });

  it('should delete a cake', (done) => {
    chai.request(server).delete(`/cakes/removeCake/${testCake._id}`).end((err, res) => {
      expect(err).to.be.null;
      expect(res.status).to.equal(204);
      return done();
    });
  });
});
