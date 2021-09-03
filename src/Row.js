import React, { useState, useEffect } from "react";
import axios from "./axios";
import YouTube from "react-youtube";
import movieTrailer from "movie-trailer";
import "./Row.css";

const base_url = "https://image.tmdb.org/t/p/original";

function Row({ title, fetchUrl, isLargeRow }) {
  const [movies, setMovies] = useState([]);
  const [trailerUrl, setTrailerUrl] = useState("");

  // useEffect is used when we have some specific condition
  useEffect(() => {
    async function fetchData() {
      const request = await axios.get(fetchUrl);
      setMovies(request.data.results);
      return request;
    }
    fetchData();
  }, [fetchUrl]);

  const opts = {
    height: "390",
    width: "99%",
    playerVars: {
      autoplay: 1,
    },
  };

  const handleClick = (movie) => {
    // console.table(movie?.title)
    if (trailerUrl) {
      setTrailerUrl("");
    } else {
      movieTrailer(movie?.title || movie?.name || movie?.original_name || "")
        .then((url) => {
          const urlParams = new URLSearchParams(new URL(url).search);
          setTrailerUrl(urlParams.get("v"));
        })
        .catch((error) => console.log(error));
    }
  };

  return (
    <div className="row">
      <h2>{title}</h2>
      <div className="row_posters">
        {movies.map((movie) => {
          return (
            <img
              key={movie.id}
              onClick={() => handleClick(movie)}
              className={`row_poster ${isLargeRow && "row_posterLarge"}`}
              src={`${base_url}${
                isLargeRow
                  ? movie?.poster_path || movie?.backdrop_path
                  : movie?.backdrop_path || movie?.poster_path
              }`}
              alt={movie.name}
            />
          );
        })}
      </div>
      <div style={{ padding: "40px" }}>
        {trailerUrl && <YouTube videoId={trailerUrl} opts={opts} />}
      </div>
    </div>
  );
}

export default Row;

/*
Notes:
1. States is like short term memory - when we refresh it disappears, it is used to store some information

2. useEffect(() => {
        
    }, []);
    -> If we leave [] (blank) -> run once when the row/page loads, and then don't run it again

3. useEffect(() => {
        
    }, [movies]);
    -> It will run once when the row loads, and then run every time the movie changes
    -> This effect is dependent on movies variable


4. useEffect(() => {
        // Everytime, when a specific row() from the API is loaded, this code will run
        async function fetchData() {
            const request = await axios.get(fetchUrl);
            // Eg.: For NETFLIX ORIGINALS : 'https://api.themoviedb.org/3/discover/tv?api_key=${API_KEY}$with_networks=213' where https://api.themoviedb.org/3 is the base URL and the rest is 'fetchUrl' which is received from prop
        }
        fetchData()
    }, []);

5. Whenever we use any outer variable inside of useEffect, we have to include it inside of []
Eg:
    useEffect(() => {
        // Everytime, when a specific row() from the API is loaded, this code will run
        async function fetchData() {
            const request = await axios.get(fetchUrl);
           console.log(request);
           setMovies(request.data.results);
           return request;
        }
        fetchData()
    }, [fetchUrl]);  <-- as it is a variable outside of this useEffect block and we need to explicitly tell useEffect that we're using a variable outside of the block

6. Keys ->If we have many items in a row (in our case 20), we must render it in most efficient way, react has 'KEY' which is something unique

7. new URL(url).search -> https://www.youtube.com/watch?v=XtMThy8QKqU&t=10203s
-> used to get the string after '?' which is : 'XtMThy8QKqU&t=10203s '

8. new URLSearchParams(new URL(url).search) 
->
allows us to perform a GET request for v
*/
