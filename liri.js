require('dotenv').config();
const keys = require ("./keys.js")
const Spotify = require('node-spotify-api');
const request = require('request');
const fs = require('fs');
// var inquirer = require('inquirer');

// inquirer
//   .prompt([
//     {
//       type: 'checkbox',
//       message: 'Select the command you would like to run',
//       name: 'commands',
//       choices: [
      
//         {
//           name: 'Spotify-this (Song)'
//         },
//         {
//           name: 'Movie-this (Movie)'
//         },
//         {
//           name: 'Concert-this (Artist or Band)'
//         },
//         {
//           name: 'do-what-it-says (Suprise :b)'
//         }
//       ]
//     }

//       ])
//       .then(answers => {
//         console.log("=======Enter node liri 'chosen command' plus Any Song/Movie/Artist of choice corresponding with the command In the command line======");
      
//       });
    


const spotify = new Spotify({
    id: keys.spotify.id,
    secret: keys.spotify.secret
  });
//Global variables 
//slice method is used to be able to pass multiple words to the argument
 var song = process.argv.slice(3, process.argv.length).join(' ');
 var movieName = process.argv.slice(3, process.argv.length).join(' ');
 var artistName = process.argv.slice(3, process.argv.length).join(' ');
 var command = process.argv[2];
 // function to call if the argument passed is spotify-this
  if( command === 'spotify-this'){

    spotifyThis();
}// function to call if the argument passed is concert-this
   else if(command === 'concert-this'){

    concertThis();
}// function to call if the argument passed is movie-this
  else if(command === 'movie-this'){

    movieThis();    
}
// function to call if the argument passed is do-what-it-says
   else if ( command === 'do-what-it-says'){

    doWhatISay()
  };

//function to run the command in the txt file
  function doWhatISay(){
    fs.readFile('random.txt', 'utf8', function(error, data) {
      if (error) {
        return console.log(error);
      }
      //assigned command value to the data 
      command = data.slice(0,12);
      song = data.slice(14, data.length);
      //command to run if data matches spotify command
      if(command === "spotify-this"){
        spotifyThis()
      }
      
    
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
          // to display the data in a JSON format which is easily readable 
          let venue = JSON.parse(body);
          //for loop is to loop through the data to extract what is only needed which in this case is the venue
          for(let i = 0; i < venue.length; i++){
            console.log(venue[i].venue)
          }
     
        }
      )

    };

  function movieThis(){
    //movie to pass through the command when no movie name is provided
    if (movieName === ""){
      movieName = "Mr. Nobody"
    }
    //api request for movie data
  request(
    `http://www.omdbapi.com/?t=${movieName}&apikey=${keys.movie.id}` , function (error, response, body) {
  
      if (error) {
        return console.log('Error occurred: ' + error);
      }
      //output data when command is ran
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