// Tip : you can place the base structure by using the snippet => rfce   from ES7 Snippets extension.
import React, { useState, useEffect } from "react";
import axios from "./axios"; // if you have a default export, then you can name it whatevery you want  when you import.
import "./Row.css";
import YouTube from "react-youtube";
import movieTrailer from "movie-trailer";

const base_url = "https://image.tmdb.org/t/p/original/";

function Row({ title, fetchUrl, isLargeRow }) {
  const [movies, setMovies] = useState([]);
  const [trailerUrl, setTrailerUrl] = useState("");
  // use of useState Hook, which enables to introduce state in functional components...
  // useState returns an array with the state and the function to set the state. We can assign them to corresponding
  // variables via array destructuring, as seen above.

  useEffect(() => {
    async function fetchData() {
      const request = await axios.get(fetchUrl);
      setMovies(request.data.results);
      return request;
    }
    fetchData();
  }, [fetchUrl]);
  // everything inside the useEffect's arrow function will be executed everytime the Row is rendered. In order to execute it
  // only once or on a certain change, useEffect takes a second parameter (an array) to be used. If the value provided
  // within the array changes, our arrow function will be executed. So even if then component is rendered again, only if the
  // if the variable (state) changes the arrow  function is called.
  // Finally, if we pass an empty array as a parameter, this means only call this function on mount, just once.

  //console.log(movies); // to check if our state variable populated correctly.
  // note that we can also use console.table(movies) to have a tabular view under browser's console

  const opts = {
    height: "390",
    width: "100%",
    playerVars: {
      //https://developers.google.com/youtube/player_parameters
      autoplay: 1,
    },
  };

  const handleClick = (movie) => {
    if (trailerUrl) {
      setTrailerUrl("");
    } else {
      console.log(movie);
      movieTrailer(
        movie?.name || movie?.original_name || movie?.original_title
      ).then((response) => {
        //https://www.youtube.com/watch?v=O6P86uwfdR0
        const urlParams = new URLSearchParams(new URL(response).search);
        setTrailerUrl(urlParams.get("v")); // this will only get the search parameter v's value
      });
    }
  };

  return (
    <div className="row">
      {/*  title */}
      <h2>{title}</h2>
      {/*  container -> posters  */}
      {/*  we add container here becaise we want it to be scrollable. */}
      <div className="row__posters">
        {movies.map((movie) => (
          <img
            key={movie.id}
            onClick={() => handleClick(movie)}
            className={`row__poster ${isLargeRow && "row__posterLarge"}`}
            src={`${base_url}${
              isLargeRow ? movie.poster_path : movie.backdrop_path
            }`}
            alt={movie?.name || movie?.title}
          />
        ))}
      </div>
      {trailerUrl && <YouTube videoId={trailerUrl} opts={opts} />}
      {/* checkout https://www.npmjs.com/package/react-youtube for documentation */}
    </div>
  );
}

export default Row;
