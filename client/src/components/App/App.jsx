import React, {useState} from "react";
import Home from "../Home/Home";
import MovieDetails from "../MovieDetails/MovieDetails";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

export default function App() {

	const [movies, setMovies] = useState({})

	return (
		<Router>
			<div>
				<Switch>
					<Route path="/movie/:movieId" render={(props) => <MovieDetails {...props}  />} />
					<Route path="/">
						<Home movies={movies} setMovies={setMovies} />
					</Route>
				</Switch>
			</div>
		</Router>
	);
}
