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
          {/* <div className="card banner-card">
              <img className="card-img-top banner-img" src={`https://image.tmdb.org/t/p/original/${this.state.movies[this.state.idx].backdrop_path}`} alt="..."/>
              <div className="card-body banner-body">
                  <h5 className="card-title banner-title">{this.state.movies[this.state.idx].original_title}</h5>
                  <p className="card-text banner-desc">{this.state.movies[this.state.idx].overview}</p>
              </div>
          </div> */}
          <div id="carouselExampleCaptions" className="carousel slide" data-bs-ride="false">
            <div className="carousel-indicators">
              <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
              <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="1" aria-label="Slide 2"></button>
              <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="2" aria-label="Slide 3"></button>
            </div>
            <div className="carousel-inner">
              <div className="carousel-item carousel-img active">
                <img src={`https://image.tmdb.org/t/p/original/${this.state.movies[this.state.idx-1].backdrop_path}`} className="d-block w-100" alt="..."/>
                <div className="carousel-caption d-none d-md-block">
                  <h5 className="banner-title">{this.state.movies[this.state.idx-1].original_title}</h5>
                  <p>{this.state.movies[this.state.idx-1].overview}</p>
                </div>
              </div>
              <div className="carousel-item carousel-img">
                <img src={`https://image.tmdb.org/t/p/original/${this.state.movies[this.state.idx].backdrop_path}`} className="d-block w-100" alt="..."/>
                <div className="carousel-caption d-none d-md-block">
                  <h5 className="banner-title">{this.state.movies[this.state.idx].original_title}</h5>
                  <p>{this.state.movies[this.state.idx].overview}</p>
                </div>
              </div>
              <div className="carousel-item carousel-img">
                <img src={`https://image.tmdb.org/t/p/original/${this.state.movies[this.state.idx+1].backdrop_path}`} className="d-block w-100" alt="..."/>
                <div className="carousel-caption d-none d-md-block">
                  <h5 className="banner-title">{this.state.movies[this.state.idx-1].original_title}</h5>
                  <p>{this.state.movies[this.state.idx+1].overview}</p>
                </div>
              </div>
            </div>
            <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="prev">
              <span className="carousel-control-prev-icon" aria-hidden="true"></span>
              <span className="visually-hidden">Previous</span>
            </button>
            <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="next">
              <span className="carousel-control-next-icon" aria-hidden="true"></span>
              <span className="visually-hidden">Next</span>
            </button>
          </div>
        </div>
      }
      </>
    )
  }
}
