/* eslint-disable no-underscore-dangle */
/* eslint-disable no-unused-expressions */
const chai = require('chai');
const chaiHTTP = require('chai-http');

chai.use(chaiHTTP);
const { expect } = chai;

const Cake = require('../db');

const server = require('../index');

const mongoose = require("mongoose");

describe('CRUD Testing', () => {
  let testCake;

  afterAll(async () => {
    await mongoose.disconnect();
  })

  beforeEach(async () => {
    await Cake.deleteMany({});
    testCake = await Cake.create({
      name: 'Fairy Cake',
      cost: 3.40,
      amount: 2,
    });
    testCake = JSON.parse(JSON.stringify(testCake));
  });

  test('should create a cake', (done) => {
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

  test('should find a cake', (done) => {
    chai.request(server).get(`/cakes/getCake/${testCake._id}`).end((err, res) => {
      expect(err).to.be.null;
      expect(res.status).to.equal(200);
      expect(res.body).to.deep.equal(testCake);
      return done();
    });
  });

  test('should find cakes', (done) => {
    chai.request(server).get('/cakes/getAllCakes').end((err, res) => {
      expect(err).to.be.null;
      expect(res.status).to.equal(200);
      expect(res.body).to.have.lengthOf(1);
      expect(res.body[0]).to.deep.equal(testCake);
      return done();
    });
  });

  test('should update a cake', (done) => {
    chai.request(server).patch(`/cakes/updateCake/${testCake._id}`).query({ name: 'Jaffa' }).end((err, res) => {
      expect(err).to.be.null;
      expect(res.status).to.equal(200);
      expect(res.body).to.include(testCake);

      return done();
    });
  });

  test('should delete a cake', (done) => {
    chai.request(server).delete(`/cakes/removeCake/${testCake._id}`).end((err, res) => {
      expect(err).to.be.null;
      expect(res.status).to.equal(204);
      return done();
    });
  });
});
