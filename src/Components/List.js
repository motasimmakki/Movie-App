import React, { Component } from 'react'
import {movies} from './getMovies'

export default class List extends Component {
  constructor() {
    super();
    this.state = {
      hover: ''
    }
  }
  handleEnter = (id) => {
    this.setState({
      hover: id
    });
  }
  handleLeave = () => {
    this.setState({
      hover: ''
    });
  }
  async componentDidMount() {
    console.log("CDM is Called");
    let result = await fetch("https://api.themoviedb.org/3/movie/550?api_key=fa7127a13c542d5323ce1a236b9df18a");
    let data = result.json();
    console.log(data);
  }
  componentDidUpdate() {
    console.log("CDU is Called");
    
  }
  componentWillUnmount() {
    console.log("CWU is Called");
    
  }
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
                        <div className="card movie-card" 
                        onMouseEnter={() => this.handleEnter(movie.id)} 
                        onMouseLeave={this.handleLeave}
                        key={movie.id}
                        >
                            <img className="card-img-top movie-img" src={`https://image.tmdb.org/t/p/original/${movie.backdrop_path}`} alt="..."/>
                            <h5 className="card-title movie-title">{movie.original_title}</h5>
                            <div className='movie-btn-wrapper'>
                              { (this.state.hover == movie.id) &&
                                <a href="#" className="btn btn-info movie-btn">
                                  Add To Favourites
                                </a>
                              }
                            </div>
                        </div>
                    );
                })}
            </div>
          </div>
          <div className='pagination'>
            <nav aria-label="...">
              <ul className="pagination">
                <li className="page-item disabled">
                  <span className="page-link">Previous</span>
                </li>
                <li className="page-item"><a className="page-link" href="#">1</a></li>
                <li className="page-item active" aria-current="page">
                  <span className="page-link">2</span>
                </li>
                <li className="page-item"><a className="page-link" href="#">3</a></li>
                <li className="page-item">
                  <a className="page-link" href="#">Next</a>
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


// Movie API Link:
// https://api.themoviedb.org/3/movie/550?api_key=fa7127a13c542d5323ce1a236b9df18a
// Movie API Key:
// fa7127a13c542d5323ce1a236b9df18a