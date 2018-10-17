require('dotenv').config();
const keys = require ("./keys.js")
var Spotify = require('node-spotify-api');
var request = require('request');

// const spotifyId = process.env.SPOTIFY_ID;
// const spotifySecret = process.env.SPOTIFY_SECRET;

// console.log(spotifyId);
// console.log(spotifySecret);


// const validCommands = ["concert-this", "spotify-this", "movie-this", "do-what-it-says"];

var spotify = new Spotify({
    id: keys.spotify.id,
    secret: keys.spotify.secret
  });
   

  if( process.argv[2] === 'spotify-this'){
    // to pass songs that have multiple words
    var song = process.argv.slice(3, process.argv.length).join(' ');
   if (song === ""){
     song = "What's My Age Again"
   }
    
   spotify.search({ type: 'track', query: song }, function(err, data) {
       if (err) {
         return console.log('Error occurred: ' + err);
       }
       
           console.log("Album Name: " + data.tracks.items[0].album.name); 
           console.log("Preview Link :" + data.tracks.items[0].preview_url)
           data.tracks.items[0].artists.forEach(element => {
                console.log("Artist Name : " + element.name);
           })
     });

   }else if(process.argv[2] === 'concert-this'){

    var artistName = process.argv.slice(3, process.argv.length).join(' ');
    if(artistName === ""){
      console.log("Please Provide Artist or Band Name");
    }

      request(
        `https://rest.bandsintown.com/artists/${artistName}/events?app_id=${keys.band.id}`  , function (error, response, body) {
        
        if (error) {
          return console.log('Error occurred: ' + error);
        }
        // const infoReceived = JSON.parse(body);
        // console.log("Venue: ", infoReceived.venue)

        console.log('error:', error);
        console.log('statusCode:', response && response.statusCode); 
        console.log('body:', body); 
      }
    )
  }else if(process.argv[2] === 'movie-this'){

    var movieName = process.argv.slice(3, process.argv.length).join(' ');
    if (movieName === ""){
      movieName = "Mr. Nobody"
    }

  request(
    `http://www.omdbapi.com/?t=${movieName}&apikey=${keys.movie.id}` , function (error, response, body) {
  
      if (error) {
        return console.log('Error occurred: ' + error);
      }
      const dataReceived = JSON.parse(body);
      console.log("Movie Title: ", dataReceived.Title );
      console.log("Year: ", dataReceived.Year );
      console.log("imdbRating: ", dataReceived.imdbRating );
      console.log("Rotten Tomatoes: ", dataReceived.Ratings[1].value);
      console.log("Country Movie Was Produced: ", dataReceived.Country );
      console.log("Language of The Movie: ", dataReceived.Language );
      console.log("Plot of The Movie: ", dataReceived.Plot );
      console.log("Actors: ", dataReceived.Actors );

}
)
  };

 

