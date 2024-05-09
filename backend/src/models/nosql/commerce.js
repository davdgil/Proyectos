const mongoose = require('mongoose');

const commerceSchema = new mongoose.Schema({
  commerceName: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  phone: {
    type: String,
    required: false
  },
  cif: {
    type: String,
    required: true,
    unique: true
  },
  address: {
    type: String,
    required: true
  },
  // Relación con el modelo User
  merchant: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
});

const Commerce = mongoose.model('Commerce', commerceSchema);

module.exports = Commerce;
