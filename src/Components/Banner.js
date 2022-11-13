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
          <div id="carouselExampleCaptions" class="carousel slide" data-bs-ride="false">
            <div class="carousel-indicators">
              <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
              <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="1" aria-label="Slide 2"></button>
              <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="2" aria-label="Slide 3"></button>
            </div>
            <div class="carousel-inner">
              <div class="carousel-item active">
                <img src={`https://image.tmdb.org/t/p/original/${this.state.movies[this.state.idx-1].backdrop_path}`} class="d-block w-100" alt="..."/>
                <div class="carousel-caption d-none d-md-block">
                  <h5>First slide label</h5>
                  <p>Some representative placeholder content for the first slide.</p>
                </div>
              </div>
              <div class="carousel-item">
                <img src={`https://image.tmdb.org/t/p/original/${this.state.movies[this.state.idx].backdrop_path}`} class="d-block w-100" alt="..."/>
                <div class="carousel-caption d-none d-md-block">
                  <h5>Second slide label</h5>
                  <p>Some representative placeholder content for the second slide.</p>
                </div>
              </div>
              <div class="carousel-item">
                <img src={`https://image.tmdb.org/t/p/original/${this.state.movies[this.state.idx+1].backdrop_path}`} class="d-block w-100" alt="..."/>
                <div class="carousel-caption d-none d-md-block">
                  <h5>Third slide label</h5>
                  <p>Some representative placeholder content for the third slide.</p>
                </div>
              </div>
            </div>
            <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="prev">
              <span class="carousel-control-prev-icon" aria-hidden="true"></span>
              <span class="visually-hidden">Previous</span>
            </button>
            <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="next">
              <span class="carousel-control-next-icon" aria-hidden="true"></span>
              <span class="visually-hidden">Next</span>
            </button>
          </div>
        </div>
      }
      </>
    )
  }
}
