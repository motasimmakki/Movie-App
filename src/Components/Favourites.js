import React, { Component } from 'react'
import axios from 'axios';

export default class Favourites extends Component {
  constructor() {
    super();
    this.state = {
      movies: []
    }
  }
  async componentDidMount() {
    // Using Axios.
    let data = await axios.get("https://api.themoviedb.org/3/movie/popular?api_key=fa7127a13c542d5323ce1a236b9df18a&language=en-US&page=1");
    console.log(data.data);

    this.setState({
      movies: [...data.data.results]
    });
  }
  render() {
    let genreId = {
      28: "Action",
      12: "Adventure",
      16: "Animation",
      35: "Comedy",
      80: "Crime",
      99: "Documentary",
      18: "Drama",
      10751: "Family",
      14: "Fantasy",
      36: "History",
      27: "Horror",
      10402: "Music",
      9648: "Mystery",
      10749: "Romance",
      878: "Sci-Fi",
      10770: "TV",
      53: "Thriller",
      10752: "War",
      37: "Western",
    };
    return (
      <div className='favourites-cont'>
        <ul class="list-group favourites-list">
          <li class="list-group-item active" aria-current="true">All Genres</li>
          <li class="list-group-item">Action</li>
          <li class="list-group-item">Fantacy</li>
          <li class="list-group-item">Animation</li>
        </ul>
        <table className="table favourites-table">
          <thead>
            <tr>
              <th scope="col">Title</th>
              <th scope="col">Genre</th>
              <th scope="col">Popularity</th>
              <th scope="col">Rating</th>
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody>
            {
              this.state.movies.map(movie => (
                <tr>
                  <td>
                    <img className='movie-img' src={`https://image.tmdb.org/t/p/original/${movie.backdrop_path}`}/>
                    {movie.original_title}
                  </td>
                  <td>{genreId[movie.genre_ids[0]]}</td>
                  <td>{movie.popularity}</td>
                  <td>{movie.popularity}</td>
                  <td>{movie.vote_average}</td>
                  <td><button className='btn btn-outline-danger'>DELETE</button></td>
                </tr>
              ))
            }
          </tbody>
        </table>
      </div>
    )
  }
}
