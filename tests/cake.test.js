/* eslint-disable no-underscore-dangle */

const request = require('supertest');

const mongoose = require('mongoose');
const Cake = require('../db');

const server = require('../index');

describe('CRUD Testing', () => {
  let testCake;

  afterAll(async () => {
    await mongoose.disconnect();
  });

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

    request(server).post('/cakes/createCake').send(newCake).end((err, res) => {
      try {
        expect(err).toBeNull();
        expect(res.status).toBe(201);
        expect(res.body).toMatchObject(newCake);
        expect(res.body._id).toBeTruthy();
      } catch (error) {
        return done(error);
      }
      return done();
    });
  });

  test('should find a cake', (done) => {
    request(server).get(`/cakes/getCake/${testCake._id}`).end((err, res) => {
      try {
        expect(err).toBeNull();
        expect(res.status).toBe(200);
        expect(res.body).toMatchObject(testCake);
      } catch (error) {
        return done(error);
      }
      return done();
    });
  });

  test.skip('should NOT find a cake', (done) => {
    request(server).get('/cakes/getCake/').end((err, res) => {
      try {
        expect(err).toBeNull();
        expect(res.status).toBe(400);
        expect(res.body).toMatchObject(testCake);
      } catch (error) {
        return done(error);
      }
      return done();
    });
  });
  test('should find cakes', (done) => {
    request(server).get('/cakes/getAllCakes').end((err, res) => {
      try {
        expect(err).toBeNull();
        expect(res.status).toBe(200);
        expect(res.body).toHaveLength(1);
        expect(res.body[0]).toMatchObject(testCake);
      } catch (error) {
        return done(error);
      }
      return done();
    });
  });

  test('should update a cake', (done) => {
    request(server).patch(`/cakes/updateCake/${testCake._id}`).query({ name: 'Jaffa' }).end((err, res) => {
      try {
        expect(err).toBeNull();
        expect(res.status).toBe(200);
        expect(res.body).toMatchObject(testCake);
      } catch (error) {
        return done(error);
      }
      return done();
    });
  });

  test('should delete a cake', (done) => {
    request(server).delete(`/cakes/removeCake/${testCake._id}`).end((err, res) => {
      try {
        expect(err).toBeNull();
        expect(res.status).toBe(204);
      } catch (error) {
        return done(error);
      }
      return done();
    });
  });
});
