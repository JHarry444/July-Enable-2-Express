const Cake = require('../db');

const getAllCakes = async () => Cake.find();

module.exports = { getAllCakes };
