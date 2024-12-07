// models/numerologyModel.js
const mongoose = require('mongoose');

const NumerologySchema = new mongoose.Schema({
  name: { type: String, required: true },
  dob: { type: String, required: true },
  lifePathNumber: { type: Number, required: true },
  message: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Numerology', NumerologySchema);
