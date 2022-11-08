import React, { Component } from 'react'
import {movies} from './getMovies';

export default class Banner extends Component {
  render() {
    let movie = movies.results[0];
    return (
      <div className='banner-cont'>
        <div className="card">
            <img src={`https://image.tmdb.org/t/p/original/${movie.backdrop_path}`} class="card-img-top" alt="..."/>
            <div className="card-body">
                <h5 className="card-title">{movie.original_title}</h5>
                <p className="card-text">{movie.overview}</p>
                {/* <a href="#" className="btn btn-primary">Go somewhere</a> */}
            </div>
        </div>
      </div>
    )
  }
}
