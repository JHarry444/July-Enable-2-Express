/* eslint-disable consistent-return */
const router = require('express').Router();

const { body } = require('express-validator');

const Cake = require('../db');

router.post(
  '/createCake',
  body('name').notEmpty().withMessage({ message: 'Name is required!', statusCode: 400 }),
  body('amount').isNumeric({ min: 1, max: 99 }),
  body('cost').isDecimal({ force_decimal: true, decimal_digits: 2 }),
  async (req, res, next) => {
    try {
      const created = await Cake.create(req.body);
      return res.status(201).json(created);
    } catch (err) {
      return next(err);
    }
  },
);

router.get('/getAllCakes', (req, res, next) => {
  Cake.find().then((results) => res.json(results)).catch((err) => next(err));
});

router.get('/getCake/:id', (req, res, next) => {
  console.log('PARAMS', req.params);
  const { id } = req.params;
  if (id === null || id === undefined) return next({ statusCode: 400, message: 'Missing id' });

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
