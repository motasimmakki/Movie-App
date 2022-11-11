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
    return (
      <div>
        <table className="table">
          <thead>
            <tr>
              <th scope="col">Title</th>
              <th scope="col">Genre</th>
              <th scope="col">Popularity</th>
              <th scope="col">Rating</th>
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
                  {/* <td>{genreId[movie.genre_ids[0]]}</td> */}
                  <td>{movie.popularity}</td>
                  <td>{movie.vote_average}</td>
                </tr>
              ))
            }
          </tbody>
        </table>
      </div>
    )
  }
}
