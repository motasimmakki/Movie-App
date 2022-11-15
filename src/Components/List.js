import React, { Component } from 'react'
// import {movies} from './getMovies'
import Banner from './Banner'
import './Banner.css'
import axios from 'axios';

let favouritesList = [];

export default class List extends Component {
  constructor() {
    super();
    this.state = {
      hover: '',
      movies: [],
      currPage: 1,
      favourites: favouritesList.map(movie => movie.id)
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
    favouritesList = JSON.parse(localStorage.getItem("movies"));
    // console.log(favouritesList);
    // console.log("CDM is Called");
    // Using fetch.
    // let result = await fetch("https://api.themoviedb.org/3/movie/popular?api_key=fa7127a13c542d5323ce1a236b9df18a&language=en-US&page=1");
    // let data = await result.json();

    // Using Axios.
    let data = await axios.get("https://api.themoviedb.org/3/movie/popular?api_key=fa7127a13c542d5323ce1a236b9df18a&language=en-US&page=1");
    // console.log(data.data);

    this.setState({
      movies: [...data.data.results],
      favourites: favouritesList?.map(movie => movie.id)
    });
  }
  async componentDidUpdate(prevProps, prevState) {
    // console.log("CDU is Called");
    if(this.state.currPage !== prevState.currPage) {
      // Using Axios.
      let data = await axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=fa7127a13c542d5323ce1a236b9df18a&language=en-US&page=${this.state.currPage}`);
      // console.log(data.data);
  
      this.setState({
        movies: [...data.data.results]
      });
    }
  }
  componentWillUnmount() {
    // console.log("CWU is Called");
  }
  handlePageNext = () => {
    this.setState({
      currPage: this.state.currPage + 1
    });
  }
  handlePagePrevious = () => {
    if(this.state.currPage == 1) return;
    this.setState({
      currPage: this.state.currPage - 1
    });
  }
  handleFavouritesList = (movieId, movieObj) => {
    if(this.state.favourites?.includes(movieId)) {
      this.setState({
        favourites: this.state.favourites.filter(movie => (movie !== movieId))
      })
      favouritesList = favouritesList.filter(movie => movie["id"] !== movieId);
      // console.log(movieObj["id"]);
    } else {
      this.setState({
        favourites: this.state.favourites? [...this.state.favourites, movieId]: [movieId]
      });
      favouritesList.push(movieObj);
    }
    // console.log(favouritesList);
    localStorage.setItem("movies", JSON.stringify(favouritesList));
  }
  render() {
    // console.log("Rendered");
    // let allMovies = movies.results;
    return (
      <>
      <Banner/>
      {
        this.state.movies.length === 0?
        <div className="spinner-border text-info" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
        :<>
          <div>
            <h3 className='trending'>Trending</h3>
            <div className='movies-list'>
                {this.state.movies.map(movie => {
                    return (
                        <div className="card movie-card" 
                        onMouseEnter={() => this.handleEnter(movie.id)} 
                        onMouseLeave={this.handleLeave}
                        key={movie.id}
                        >
                            <img className="card-img-top list-movie-img" src={`https://image.tmdb.org/t/p/original/${movie.backdrop_path}`} alt="..."/>
                            <h5 className="card-title movie-title">{movie.original_title}</h5>
                            <div className='movie-btn-wrapper'>
                              { (this.state.hover === movie.id) && 
                                (this.state.favourites?.includes(movie.id)?
                                  <button className="btn btn-danger movie-btn" onClick={() => this.handleFavouritesList(movie.id, movie)}>
                                    Remove From Favourites
                                  </button>
                                  : 
                                  <button className="btn btn-info movie-btn" onClick={() => this.handleFavouritesList(movie.id, movie)}>
                                    Add To Favourites
                                  </button>
                                )
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
                <li className="page-item">
                  <a className="page-link" href="#" onClick={this.handlePagePrevious}>
                    Previous
                  </a>
                </li>
                <li className="page-item active">
                  <a className="page-link" href="#">
                    {this.state.currPage}
                  </a>
                </li>
                <li className="page-item">
                  <a className="page-link" href="#" onClick={this.handlePageNext}>
                    Next
                  </a>
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