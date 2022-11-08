import React, { Component } from 'react'
import {movies} from './getMovies'

export default class List extends Component {
  render() {
    let allMovies = movies.results;
    return (
      <div>
        <h3 className='trending'>Trending</h3>
        <div className='movies-list'>
            {
            allMovies.map(movie => {
                return (
                    <div className="card movie-card">
                        <img className="card-img-top movie-img" src={`https://image.tmdb.org/t/p/original/${movie.backdrop_path}`} alt="..."/>
                        <h5 className="card-title movie-title">{movie.original_title}</h5>
                        <div className='movie-btn-wrapper'>
                            <a href="#" className="btn btn-primary movie-btn">Add To Favourites</a>
                        </div>
                    </div>
                );
            })
            }
        </div>
      </div>
    )
  }
}
