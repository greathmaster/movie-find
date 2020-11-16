import { useState, useEffect } from "react";
import { getMovieDetails } from "../../util/api";
import { Link } from "react-router-dom";
import "./MovieDetails.css";

export default function MovieDetails(props) {
	let currentMovieId = props.match.params.movieId;
	const [movieInfo, setMovieInfo] = useState({actors:[], genres: []});
	const [isLoading, setLoading] = useState(true);

	useEffect(() => {
		setLoading(true);

		getMovieDetails(currentMovieId).then((movieInfo) => {			
			setMovieInfo(movieInfo);
			setLoading(false);
		});
	}, []);

	return (
		<>
			<div className="header">Movie Find</div>

			<div className="container">
				<div className="movie-details-content">
					{isLoading ? (
						<h1>Loading...</h1>
					) : (
						<>
							<div className="movie-details-poster">
								<div className="movie-details-go-back">
									<Link
										to="#" 
										onClick={() => {
											props.history.goBack();
										}}
									>
										Go Back
									</Link>
								</div>
								<img
									src={movieInfo.image_url}
								/>
							</div>
							<div className="movie-details-info">
								<div className="movie-details-title">
									{movieInfo.title}
								</div>
								<div className="movie-details-release-date">
									Released {movieInfo.release_date}
								</div>
								<div className="movie-details-description-container">
									<div className="movie-details-description-label">
										Description:
									</div>
									<div className="movie-details-description">
										{movieInfo.overview}
									</div>
									<div className="movie-details-lower">
										<div className="movie-details-actors">
											<div className="movie-details-label">
												Actors:
											</div>
											<div>
												{movieInfo.actors.join(", ")}
											</div>
										</div>
										<div className="movie-details-genres">
											<div className="movie-details-label">
												Genres:
											</div>
											<div>
												{movieInfo.genres.join(", ")}
											</div>
										</div>
									</div>
								</div>
							</div>
						</>
					)}
				</div>
			</div>
		</>
	);
}
