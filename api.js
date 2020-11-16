const axios = require("axios");
const { BASE_URL, API_KEY, HOME_URL} = require("./config/keys.js");

const api = axios.create({ baseURL: BASE_URL });

async function searchMovies(movieTitle = null) {
	
	let searchResults = "";
	let m = {};
	try {
		if (!movieTitle) {
			searchResults = await api.get("movie/popular", {
				params: { api_key: API_KEY },
			});
		} else {
			searchResults = await api.get("search/movie", {
				params: { api_key: API_KEY, query: movieTitle },
			});
		}

		searchResults.data.results.forEach((movie) => {
			m[movie.id] = {
				id: movie.id,
				title: movie.title,
				overview: movie.overview,
				image_url: movie.poster_path ? `https://image.tmdb.org/t/p/w185${movie.poster_path}` : HOME_URL + '/images/placeholder-185x300.png',
			};
		});
	} catch (e) {}

	return m;
}

async function getMovieDetails(movieId) {
	let m = {}
	const MAX_ACTORS = 4
	try {
		let movieInfo = await api.get(`movie/${movieId}`, {
			params: { api_key: API_KEY, append_to_response: "credits,genres" },
		});

		let actors = movieInfo.data.credits.cast
			.filter((member) => {
				return (
					member.known_for_department === "Acting" &&
					member.order <= MAX_ACTORS
				);
			})
			.map((actor) => {
				return actor.name;
			});

		let genres = movieInfo.data.genres.map((genre) => {
			return genre.name;
		});
		m = {
			title: movieInfo.data.title,
			overview: movieInfo.data.overview,
			release_date: movieInfo.data.release_date,
			actors: actors,
			genres: genres,						
			image_url: movieInfo.data.poster_path ? `https://image.tmdb.org/t/p/w342${movieInfo.data.poster_path}` : HOME_URL + '/images/placeholder-342x513.png',
			
		};
	} catch (e) {}
	return m;
}

module.exports = { searchMovies, getMovieDetails };
