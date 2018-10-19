# LIRI Bot

LIRI, a command line node app is a _Language_ Interpretation and Recognition Interface that takes in parameters and gives you back data.
LIRI searches for any songs, movies, or concerts you pass into the parameter using a command and gives you back specific data about each of those searches.

# Video demo
https://drive.google.com/file/d/1-7l08rz-xCpTmeX6hw5yPaCbPbLZbp7S/view

# APIs 

Spotify
Bands In Town
imdb

# Node Packages installed
dotenv
fs
node-spotify
request

# Commands
spotify-this  - shows info about the song such as artist, album, preview url etc.
movie-this    - outputs data in the terminal about a movie searched such as actors, ratings, plot etc.
concert-this  - searches the bands in town API and gives back information about concert venue and location about the artists searched with the command.
do-what-it-says - reads the command in the txt file and passes it, outputting the song data.

# How to use
1) right click on the folder and open in terminal
2) on the command line, type in 'node liri spotify-this (or any other command you want to run) song name (name of song you want to search). lets say you want to search burn, This is exactly how you will input in the command line.

node liri spotify-this burn

this will provide you with data relating to the song burn. Same goes for movie-this (search with a movie name) and concert-this (search with an artist or band name), 