// Master Release model, modeled on Discog's Master Release.
// So far, we don't include image URIs in our database.
const mongoose = require('mongoose');
const random = require('mongoose-simple-random');

const { Schema } = mongoose;
const masterSchema = new Schema({
  id: Number,
  styles: [String],
  genres: [String],
  videos: [{
    title: String,
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

masterSchema.plugin(random);

const Master = mongoose.model('Master', masterSchema);

module.exports = Master;
