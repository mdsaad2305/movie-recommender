import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Ulogo from '../img/tmdb.JPG'

require('dotenv').config();

function MovieInfoBox() {
  const [movie, setMovie] = useState(null);
  const [img, setImg] = useState('');

  useEffect(() => {
    fetchRandomMovie();
  }, []);

  const fetchRandomMovie = () => {
    
    const apiKey = process.env.API_KEY;
    

    const randomMovieId = Math.floor(Math.random() * 500) + 1;

    axios
      .get(`https://api.themoviedb.org/3/movie/${randomMovieId}?api_key=${apiKey}&language=en-US`)
      .then((response) => {
        setMovie(response.data);
        setImg(`https://image.tmdb.org/t/p/w500${response.data.poster_path}`);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  };

  return (
    <div className='bg-gray-800 min-h-screen flex items-center justify-center'>
      <div className='bg-gray-900 p-6 rounded-lg shadow-lg text-white w-2/3'>
        {movie ? (
          <div>
            <h1 className='text-center text-5xl'>
              {movie.title}
            </h1>
            <div className='flex justify-center items-center'>
              {img && <img src={img} alt="Movie Poster" className="mt-4 mb-4 mr-16 ml-4 w-96 h-96" />}
              <div className='flex flex-col text-lg'>
                <strong>Rating: {movie.vote_average}/10</strong>
                <strong>Release Date: {movie.release_date}</strong>
                <strong>Runtime: {movie.runtime} minutes</strong>
                <strong>Genre: {movie.genres.map(genre => genre.name).join(', ')}</strong>
                <strong>Description : {movie.overview}</strong>
              </div>
            </div>
            <div className=' items-center text-center'>
              <button
                className='bg-blue-700 hover:bg-blue-800 text-white py-2 px-4 rounded'
                onClick={fetchRandomMovie}
              >
                New Suggestion
              </button>
              <h1 className=' pt-3'>Movie data provided by</h1>
              <div className=' flex items-center justify-center'>
                <img
                  src={Ulogo}
                  alt="TMDB"
                  className=' w-72'
                />
              </div>

            </div>
          </div>
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </div>
  );
  
}

export default MovieInfoBox;