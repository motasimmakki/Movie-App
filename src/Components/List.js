import React, { Component } from 'react'
import {movies} from './getMovies'

export default class List extends Component {
  render() {
    let allMovies = movies.results;
    return (
      <> 
      {
        allMovies.length == 0?
        <div class="spinner-border text-info" role="status">
          <span class="visually-hidden">Loading...</span>
        </div>
        :<>
          <div>
            <h3 className='trending'>Trending</h3>
            <div className='movies-list'>
                {allMovies.map(movie => {
                    return (
                        <div className="card movie-card">
                            <img className="card-img-top movie-img" src={`https://image.tmdb.org/t/p/original/${movie.backdrop_path}`} alt="..."/>
                            <h5 className="card-title movie-title">{movie.original_title}</h5>
                            <div className='movie-btn-wrapper'>
                                <a href="#" className="btn btn-info movie-btn">Add To Favourites</a>
                            </div>
                        </div>
                    );
                })}
            </div>
          </div>
          <div className='pagination'>
            <nav aria-label="...">
              <ul class="pagination">
                <li class="page-item disabled">
                  <span class="page-link">Previous</span>
                </li>
                <li class="page-item"><a class="page-link" href="#">1</a></li>
                <li class="page-item active" aria-current="page">
                  <span class="page-link">2</span>
                </li>
                <li class="page-item"><a class="page-link" href="#">3</a></li>
                <li class="page-item">
                  <a class="page-link" href="#">Next</a>
                </li>
              </ul>
            </nav>
          </div>
        </>
      }
      </>
    )
  }
}
