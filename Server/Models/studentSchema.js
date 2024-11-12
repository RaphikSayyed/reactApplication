const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true }, 
  standard: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  marks: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Mark'
    }
  ]
});

module.exports = mongoose.model('Student', studentSchema);
