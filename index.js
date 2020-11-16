const express = require('express')
const cors = require('cors');
const {searchMovies, getMovieDetails} = require('./api.js')

const app = express()

app.use(cors());
app.use(express.static('public'));

//Serves all the request which includes /images in the url from Images folder
app.use('/images', express.static(__dirname + '/Images'));

app.get('/movies/', async (req, res) => {
	let searchResults = await searchMovies(req.query.title)
	return res.json(searchResults);
})

app.get('/movie/:movieId', async (req, res) => {

	let movieInfo = await getMovieDetails(req.params.movieId)
	return res.json(movieInfo)
})

app.listen(4000, () => {
	console.log("Listening on Port 4000")
})