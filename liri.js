require('dotenv').config();

const keys = require ("./keys.js")

var Spotify = require('node-spotify-api');

var spotify = new Spotify({
    id: keys.spotify.id,
    secret: keys.spotify.secret
  });
   
  

  if( process.argv[2] === 'spotify-this'){
    var song = process.argv.slice(3, process.argv.length).join(' ');
   
    
   spotify.search({ type: 'track', query: song }, function(err, data) {
       if (err) {
         return console.log('Error occurred: ' + err);
       }
       
           console.log("Name: " + data.tracks.items[0].album.name); 
           console.log("Preview Link :" + data.tracks.items[0].preview_url)
           data.tracks.items[0].artists.forEach(element => {
                console.log("Artist Name : " + element.name);
           })
     });
  }else if(process.argv[2] === "band"){
      
  }