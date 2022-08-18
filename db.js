const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/fast-track-db', { useNewUrlParser: true }, (err) => {
  if (err) return console.error(err);
  return console.log('Connection successful');
});

const { Schema } = mongoose;

// Cake @Entity
const cakeSchema = new Schema({
  name: {
    type: String,
    required: true,
    min: 2,
  },
  cost: {
    type: Number,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
    min: 1,
    max: 99,
  },
});

// Repo -> JPARepository<Cake, Number>
const Cake = mongoose.model('cake', cakeSchema); // it will pluralise the name

module.exports = Cake;
