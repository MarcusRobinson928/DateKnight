const mongoose = require('mongoose');

// Save a reference to the Schema constructor
const Schema = mongoose.Schema;

// Using the Schema constructor, create a new TweetSchema object
const dateSelectionsSchema = new Schema({
  dateSelections: {
    music: String,
    dinner: String,
    movie: String,
    theater: String,
    sports: String,
  }
});

// This creates our model from the above schema, using Mongoose's model method
var dateSelections = mongoose.model('dateSelections', dateSelectionsSchema);

// Export the Tweet model
module.exports = dateSelections;