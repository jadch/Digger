// Master Release model, modeled on Discog's Master Release.
// So far, we don't include video or image URIs in our database.
const mongoose = require('mongoose');

const { Schema } = mongoose;
const masterSchema = new Schema({
  id: Number,
  styles: [String],
  genres: [String],
  artists: [{
    name: String,
    anv: String,
    id: Number,
  }],
  title: String,
  year: Number,
  tracklist: [{
    duration: String,
    position: String,
    type: String,
    title: String,
  }],
  main_release: Number,
  num_for_sale: Number,
  data_quality: String,
});

const Master = mongoose.model('Master', masterSchema);

module.exports = Master;
