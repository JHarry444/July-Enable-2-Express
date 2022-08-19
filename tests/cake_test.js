/* eslint-disable no-underscore-dangle */
/* eslint-disable no-unused-expressions */
const { describe, it, beforeEach } = require('mocha');
const chai = require('chai');
const chaiHTTP = require('chai-http');

chai.use(chaiHTTP);
const { expect } = chai;

const Cake = require('../db');

const server = require('../index');

describe('CRUD Testing', () => {
  let id;

  beforeEach(async () => {
    try {
      await Cake.deleteMany({});
      const testCake = await Cake.create({
        name: 'Fairy Cake',
        cost: 3.40,
        amount: 2,
      });
      id = testCake._id;
    } catch (err) {
      console.error(err);
    }
  });

  it('should create a cake', (done) => {
    const newCake = {
      name: 'Madeira',
      amount: 12,
      cost: 10,
    };
    chai.request(server).post('/cakes/createCake').send(newCake).end((err, res) => {
      expect(err).to.be.null;
      expect(res.status).to.equal(201);
      expect(res.body).to.include(newCake);
      expect(res.body._id).to.not.be.null;

      return done();
    });
  });

  it('should update a cake', (done) => {
    chai.request(server).patch(`/cakes/updateCake/${id}`).query({ name: 'Jaffa' }).end((err, res) => {
      expect(err).to.be.null;
      expect(res.status).to.equal(200);
      expect(res.body).to.include({
        _id: id.toString(),
        name: 'Fairy Cake',
        cost: 3.40,
        amount: 2,
      });

      return done();
    });
  });
});
