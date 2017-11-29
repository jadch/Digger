// Master Release model, modeled on Discog's Master Release.
// So far, we don't include image URIs in our database.
const mongoose = require('mongoose');

const { Schema } = mongoose;
const masterSchema = new Schema({
  id: Number,
  styles: [String],
  genres: [String],
  videos: [{
    name: String,
    uri: String,
  }],
  artists: [{
    name: String,
    anv: String,
    id: Number,
  }],
  title: String,
  year: Number,
  main_release: Number,
  data_quality: String,
});

const Master = mongoose.model('Master', masterSchema);

module.exports = Master;
