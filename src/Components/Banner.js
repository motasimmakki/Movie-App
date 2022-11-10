import React, { Component } from 'react'
import {movies} from './getMovies';

export default class Banner extends Component {
  render() {
    let movie = movies.results;
    // let movie = [];
    return (
      <>
      {
        movie.length == 0?
        <div className="spinner-border text-warning" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
        :<div className='banner-cont'>
          <div className="card banner-card">
              <img className="card-img-top banner-img" src={`https://image.tmdb.org/t/p/original/${movie[0].backdrop_path}`} alt="..."/>
              <div className="card-body banner-body">
                  <h5 className="card-title banner-title">{movie[0].original_title}</h5>
                  <p className="card-text banner-desc">{movie[0].overview}</p>
              </div>
          </div>
        </div>
      }
      </>
    )
  }
}
