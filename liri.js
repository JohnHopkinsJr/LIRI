require("dotenv").config();
var fs = require("fs");
var request = require("request");
var keys = require("./keys.js");
var Spotify = require('node-spotify-api');
var spotify = new Spotify(keys.spotifyKeys);

var action = process.argv[2];
var searchOption = process.argv[3];

switch (action) {
	case 'concert-this':
		consertThis();
		break;
	case 'spotify-this-song':
		spotifyThisSong();
		break
	case 'movie-this':
		movieThis();
		break
	case 'do-what-it-says':
		doWhatItSays();
		break
}

//spotify function
function spotifyThisSong() {
	console.log(searchOption)
	if (searchOption === "") {
		searchOption = 'The Sign'
	}
	spotify.search( {
		type: 'track',
		query: searchOption
	}, function (err, data) {
		if (err) {
			return console.log('Error occurred: ' + err);
		}
		//console.log(data.tracks.items[0]);  //JSON Test 
		var artistName = "Artist Name: " + data.tracks.items[0].album.artists[0].name;
		var songName = "Song Name: " + data.tracks.items[0].name;
		var previewURL = "Preview URL: " + data.tracks.items[0].href;
		var albumName = "Album Name: " + data.tracks.items[0].album.name;
		console.log(artistName);
		console.log(songName);
		console.log(previewURL);
		console.log(albumName);
	});
}

//movie function
function movieThis() {
	var movieName = searchOption;
	var movieSource = "http://www.omdbapi.com/?t=" + movieName + "&apikey=trilogy";
	console.log(movieName)
	if (movieName === "") {
		movieName = 'Mr. Nobody'
	}
	request(movieSource, function (error, response, body) {
		if (!error && response.statusCode == 200) {
			var info = JSON.parse(body);
			console.log('error:', error);
			console.log('statusCode:', response && response.statusCode);
			console.log('body:', info);
			console.log("Title of the movie: " + JSON.parse(body).Title);
			console.log("Year the movie came out: " + JSON.parse(body).Year);
			console.log("IMDB Rating of the movie: " + JSON.parse(body).imdbRating);
			console.log("Rotton Tomatoes Rating of the movie: " + JSON.parse(body).Ratings[1].Value);
			console.log("Country where the movie was produced: " + JSON.parse(body).Country);
			console.log("Language of the movie: " + JSON.parse(body).Language);
			console.log("Plot of the movie: " + JSON.parse(body).Plot);
			console.log("Actors in the movie: " + JSON.parse(body).Actors);
		}
	});
};

//concert function
function concertThis() {
	var artist = search;
	var URL = "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp";

	request(URL, function (error, response, body) {
		if (!error && response.statusCode == 200) {
			var info = JSON.parse(body);
			console.log('error:', error);
			console.log('statusCode:', response && response.statusCode);
			console.log('body:', info);

		for (i = 0; i < info.length; i++) {
			var details = info[i];
			console.log(details.venue.name);
			console.log(details.datetime);
			console.log(moment(details.datetime).format("MM/DD/YY"));
			}
		}
	});
};

//doWhatItSays function
function doWhatItSays() {
	fs.readFile("random.txt", "utf8", function(error, data) {
		if (error) {
			return console.log(error);
		}
		var dataArr = data.split(",");
		action = dataArr[0];
		songTitle = dataArr[1];
		spotifyThisSong();
	})
};
