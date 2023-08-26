const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
  user: {
    type: Object,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  question: {
    type: String,
    required: true,
  },
  replied: {
    type: Boolean,
    default: false,
  },
});

const Question = mongoose.model('Question', questionSchema);

module.exports = Question;
