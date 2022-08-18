/* eslint-disable consistent-return */
const router = require('express').Router();

const Cake = require('../db');

router.post('/createCake', (req, res, next) => {
  console.log('BODY:', req.body);
  if (!req.body || Object.keys(req.body).length < 1) return next({ status: 400, message: 'No body' });

  Cake.create(req.body)
    .then((result) => res.status(201).json(result))
    .catch((err) => next(err));
});

router.get('/getAllCakes', (req, res, next) => {
  Cake.find().then((results) => res.json(results)).catch((err) => next(err));
});

router.get('/getCake/:id', (req, res, next) => {
  console.log('PARAMS', req.params);
  const { id } = req.params;
  if (id === null || id === undefined) return next({ status: 400, message: 'Missing id' });

  Cake.findById(id).then((result) => res.json(result)).catch((err) => next(err));
});

router.patch('/updateCake/:id', (req, res, next) => {
  console.log('PARAMS', req.params);
  console.log('QUERY:', req.query);
  const { id } = req.params;

  Cake.findByIdAndUpdate(id, req.query).then((result) => res.json(result)).catch((e) => next(e));
});

router.delete('/removeCake/:id', async (req, res, next) => {
  console.log('PARAMS:', req.params);

  try {
    const result = await Cake.findByIdAndDelete(req.params.id);
    return res.status(204).send(result);
  } catch (err) {
    return next(err);
  }
});

module.exports = router;
