import "./Home.css";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { searchMovies } from "../../util/api";

export default function Home({ movies, setMovies}) {
	const [search, setSearch] = useState("");
	const [isLoading, setLoading] = useState(true)
	useEffect(() => {
		
		if (Object.entries(movies).length === 0) {
			setLoading(true);
			searchMovies("").then((movies) => {				
				setMovies(movies);
				setLoading(false);
			}).catch((e) => {}) ;
		} else {
			setMovies(movies)
			setLoading(false)
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	function onSubmit(e) {
		e.preventDefault();
		setLoading(true)
		searchMovies(search).then((movies) => {
			setMovies(movies);
			setLoading(false);
			setSearch("");
		}).catch((e) => {});
	}

	return (
		<>
			<div className="header">Movie Find</div>
			<div className="container">
				<div className="search-bar">
					<form onSubmit={(e) => onSubmit(e)} className="search-form">
						<input
							className="search-field"
							onChange={(e) => setSearch(e.target.value)}
							type="text"
							placeholder="Search for a Movie"
							value={search}
						/>
						<button className="search-field-button">Search</button>
					</form>
				</div>
				<div className="search-results">
					{isLoading ? (
						<h1>Loading...</h1>
					) : (
						Object.values(movies).map((movie) => {
							return (
								<Link to={`/movie/${movie.id}`} key={movie.id}>
									<div className="movie-card">
										<div className="movie-poster">
											<img src={movie.image_url} />
										</div>
										<div className="movie-info">
											<div className="movie-title">
												<p className="movie-title-text">
													{movie.title}
												</p>
											</div>
										</div>
									</div>
								</Link>
							);
						})
					)}
				</div>
			</div>
		</>
	);
}