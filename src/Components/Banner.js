import React, { Component } from 'react'
import {movies} from './getMovies';

export default class Banner extends Component {
  render() {
    let movie = movies.results[0];
    return (
      <div className='banner-cont'>
        <div className="card banner-card">
            <img className="card-img-top banner-img" src={`https://image.tmdb.org/t/p/original/${movie.backdrop_path}`} alt="..."/>
            <div className="card-body banner-body">
                <h5 className="card-title banner-title">{movie.original_title}</h5>
                <p className="card-text banner-desc">{movie.overview}</p>
            </div>
        </div>
      </div>
    )
  }
}
