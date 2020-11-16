import axios from "axios";
import { config } from "../config/constants";

const api = axios.create({ baseURL: config.url.BASE_URL });

async function searchMovies(title = "") {
	let searchResults = {};

	try {
		searchResults = await api.get("movies", {
			params: { title },
		});
	} catch (e) {}
	return searchResults.data;
}

async function getMovieDetails(movieId) {
	let movieInfo = {};
	try {
		movieInfo = await api.get(`movie/${movieId}`, {
			params: { append_to_response: "credits,genres" },
		});
	} catch (e) {}
	return movieInfo.data;
}

export { searchMovies, getMovieDetails };
