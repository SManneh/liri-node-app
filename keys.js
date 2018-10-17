

require('dotenv').config();

exports.spotify = {
  id: process.env.SPOTIFY_ID,
  secret: process.env.SPOTIFY_SECRET
};

exports.band = {
  id: process.env.band_ID
};

exports.movie = {
  id: process.env.movie_ID
}