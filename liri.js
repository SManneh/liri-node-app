require('dotenv').config();
const keys = require ("./keys.js")
const Spotify = require('node-spotify-api');
const request = require('request');
const fs = require('fs');



const spotify = new Spotify({
    id: keys.spotify.id,
    secret: keys.spotify.secret
  });
//Global variables 
//
 var song = process.argv.slice(3, process.argv.length).join(' ');
 var movieName = process.argv.slice(3, process.argv.length).join(' ');
 var artistName = process.argv.slice(3, process.argv.length).join(' ');
 
 // function to call if the argument passed is spotify-this
  if( process.argv[2] === 'spotify-this'){

    spotifyThis();
}// function to call if the argument passed is concert-this
   else if(process.argv[2] === 'concert-this'){

    concertThis();
}// function to call if the argument passed is movie-this
  else if(process.argv[2] === 'movie-this'){

    movieThis();    
}
// function to call if the argument passed is do-what-it-says
   else if ( process.argv[2] === 'do-what-it-says'){

    doWhatISay()
  };


  function doWhatISay(){
    fs.readFile('random.txt', 'utf8', function(error, data) {
      if (error) {
        return console.log(error);
      }
    
      // We will then print the contents of data
      console.log(data);
    
    
    });
  };
    
    function spotifyThis(){
  //data to be displayed if argument for song name is empty
     if (song === ""){
       song = "What's My Age Again"
     }
      //song= song name to be searched in spotify api
     spotify.search({ type: 'track', query: song }, function(err, data) {
         if (err) {
           return console.log('Error occurred: ' + err);
         }
         //data to be displayed when song name is passed in the parameter
             console.log("Album Name: " + data.tracks.items[0].album.name); 
             console.log("Preview Link :" + data.tracks.items[0].preview_url)
             data.tracks.items[0].artists.forEach(element => {
                  console.log("Artist Name : " + element.name);
             })
       });
  
     };

    function concertThis(){
      //data to be displayed when parameter for artist name is blank
      if(artistName === ""){
        console.log("Please Provide Artist or Band Name");
      }
      //api url for bands in town
        request(
          `https://rest.bandsintown.com/artists/${artistName}/events?app_id=${keys.band.id}`  , function (error, response, body) {
          
          if (error) {
            return console.log('Error occurred: ' + error);
        
          }
          let venue = JSON.parse(body);
          for(let i = 0; i < venue.length; i++){
            console.log(venue[i].venue)
          }
     
        }
      )

    };

  function movieThis(){
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
      console.log("Rotten Tomatoes: ", dataReceived.Ratings[1].Value);
      console.log("Country Movie Was Produced: ", dataReceived.Country );
      console.log("Language of The Movie: ", dataReceived.Language );
      console.log("Plot of The Movie: ", dataReceived.Plot );
      console.log("Actors: ", dataReceived.Actors );
      // console.log(body);

}
)
  };