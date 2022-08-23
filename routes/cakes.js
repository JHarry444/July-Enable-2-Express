/* eslint-disable consistent-return */
const router = require('express').Router();

const Cake = require('../db');

router.post(
  '/createCake',
  async (req, res, next) => {
    try {
      const created = await Cake.create(req.body);
      return res.status(201).json(created);
    } catch (err) {
      return next(err);
    }
  },
);

router.get('/getAllCakes', async (req, res, next) => {
  try {
    const results = await Cake.find();
    res.json(results);
  } catch (err) {
    next(err);
  }
});

router.get('/getCake/:id', async (req, res, next) => {
  // console.log('PARAMS', req.params);
  const { id } = req.params;
  if (id === null || id === undefined) return next({ statusCode: 400, message: 'Missing id' });

  try {
    const result = await Cake.findById(id);
    res.json(result);
  } catch (err) {
    next(err);
  }
});

router.patch('/updateCake/:id', async (req, res, next) => {
  // console.log('PARAMS', req.params);
  // console.log('QUERY:', req.query);
  const { id } = req.params;
  try {
    const result = await Cake.findByIdAndUpdate(id, req.query);
    res.json(result);
  } catch (err) {
    next(err);
  }
});

router.delete('/removeCake/:id', async (req, res, next) => {
  // console.log('PARAMS:', req.params);

  try {
    const result = await Cake.findByIdAndDelete(req.params.id);
    return res.status(204).send(result);
  } catch (err) {
    return next(err);
  }
});

module.exports = router;
