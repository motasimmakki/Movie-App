import React, { Component } from 'react'
// import {movies} from './getMovies';
import axios from 'axios';

export default class Banner extends Component {
  constructor() {
    super();
    this.state = {
      movies: [],
      idx: 0
    }
  }
  async componentDidMount() {
    console.log("CDM is Called");
    // Using Axios.
    let data = await axios.get("https://api.themoviedb.org/3/movie/popular?api_key=fa7127a13c542d5323ce1a236b9df18a&language=en-US&page=1");
    console.log(data.data);
    this.setState({
      movies: [...data.data.results],
      idx: Math.floor(Math.random() * 21)
    });
  }
  render() {
    // let movie = movies.results;
    // let movie = [];
    return (
      <>
      {
        this.state.movies.length == 0?
        <div className="spinner-border text-warning" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
        :<div className='banner-cont'>
          <div className="card banner-card">
              <img className="card-img-top banner-img" src={`https://image.tmdb.org/t/p/original/${this.state.movies[this.state.idx].backdrop_path}`} alt="..."/>
              <div className="card-body banner-body">
                  <h5 className="card-title banner-title">{this.state.movies[this.state.idx].original_title}</h5>
                  <p className="card-text banner-desc">{this.state.movies[this.state.idx].overview}</p>
              </div>
          </div>
        </div>
      }
      </>
    )
  }
}
