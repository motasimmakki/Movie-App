import React, { Component } from 'react'
// import axios from 'axios';

export default class Favourites extends Component {
  constructor() {
    super();
    this.state = {
      movies: [],
      genres: [],
      currGenre: "All Genres",
      favourites: JSON.parse(localStorage.getItem("movies")),
      pageSize: 10,
      totalPages: Array.apply(null, Array(Math.ceil(JSON.parse(localStorage.getItem("movies")).length/10))),
      currPage: 0
    }
    this.genreId = {
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
  }
  async componentDidMount() {
    // console.log(this.state.favourites);
    // console.log(this.state.totalPages);
    // Using Axios.
    // let data = await axios.get("https://api.themoviedb.org/3/movie/popular?api_key=fa7127a13c542d5323ce1a236b9df18a&language=en-US&page=1");
    // // console.log(data.data);

    // let allGenre = [...data.data.results.map(movie => {
    //   return this.genreId[movie.genre_ids[0]];
    // })];

    // this.setState({
    //   movies: [...data.data.results],
    //   genres: ["All Genres", ...new Set(allGenre)]
    // });
    let allGenre = this.state.favourites?.map(movie => this.genreId[movie.genre_ids[0]]);
    this.setState({
      movies: [...this.state.favourites],
      genres: ["All Genres", ...new Set(allGenre)]
    });
  }
  handleGenre = (newGenre) => {
    let filteredMovies = (newGenre === "All Genres")? 
    [...this.state.favourites]: [...this.state.favourites.filter(movie => 
      this.genreId[movie.genre_ids[0]] === newGenre
    )];
    this.setState({
      currGenre: newGenre,
      movies: filteredMovies,
      totalPages: Array.apply(null, Array(Math.ceil(filteredMovies.length/this.state.pageSize))),
      currPage: 0
    });
  }
  componentDidUpdate(prevProps, prevState) {
    localStorage.setItem("movies", JSON.stringify(this.state.favourites));
    if(this.state.favourites !== prevState.favourites) {
      let allGenre = this.state.favourites.map(movie => this.genreId[movie.genre_ids[0]]);
      this.setState({
        movies: [...this.state.favourites],
        genres: ["All Genres", ...new Set(allGenre)]
      });
    }
  }
  handleDelete = (movieId)  => {
    // console.log(movieId);
    this.setState({
      favourites: this.state.favourites.filter(movie => movie.id !== movieId)
    });
  }
  handleSearch = (event) => {
    let searchStr = event.target.value.toLowerCase();
    this.setState({
      movies: this.state.favourites?.filter(movie => 
        movie.original_title.toLowerCase().includes(searchStr))
    });
  }
  handlePageChange = (event) => {
    let pageNo = event.target.innerText-1;
    this.setState({
      currPage: pageNo
    });
  }
  render() {
    return (
      <>
      <div className='p-5 gap-5 fav-cont'>
        <ul className="list-group col-2 fav-list">
        {
          this.state.genres.map(currGenre => (
            (currGenre === this.state.currGenre)?
            <li className="list-group-item active">
              {currGenre}
            </li>
            : <li className="list-group-item" onClick={() => this.handleGenre(currGenre)}>
              {currGenre}
            </li>
          ))
        }
        </ul>
        <div className='fav-table'>  
          <div className='d-flex justify-content-between fav-search'>
            <input className='col-7' placeholder='Search movie. . .' onKeyUp={this.handleSearch}></input>
            <input className='col-4' placeholder='Result per page (max 10 by default)' type='number'></input>
          </div>
          <table className="table mt-3 fav-table">
            <thead className='border-3 border-bottom border-secondary'>
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
                this.state.movies.map((movie, idx) => (
                  (idx >= (((this.state.currPage + 1) * this.state.pageSize) - this.state.pageSize)) &&
                  (idx < ((this.state.currPage + 1) * this.state.pageSize)) &&
                  (
                    <tr className='fav-table-row'>
                      <td className='fw-bolder fav-movie-title'>
                        <img className='fav-movie-img me-3' src={`https://image.tmdb.org/t/p/original/${movie.backdrop_path}`}/>
                        <span>{movie.original_title}</span>
                      </td>
                      <td className='align-middle fav-movie-info'>{this.genreId[movie.genre_ids[0]]}</td>
                      <td className='align-middle fav-movie-info'>{movie.popularity}</td>
                      <td className='align-middle fav-movie-info'>{movie.vote_average}</td>
                      <td className='align-middle fav-movie-info'>
                        <button className='btn btn-outline-danger' 
                        onClick={() => this.handleDelete(movie.id)}>
                          DELETE
                        </button>
                      </td>
                    </tr>
                  )
                ))
              }
            </tbody>
          </table>
          <div className='col-1 pagination'>
            <nav aria-label="...">
              <ul className="pagination">
                {
                  this.state.totalPages.map((page, idx) => (
                    (this.state.currPage === idx)? (
                      <li className="page-item active">
                        <a className="page-link" onClick={this.handlePageChange}>
                          {idx + 1}
                        </a>
                      </li>    
                    ): (
                      <li className="page-item">
                        <a className="page-link" onClick={this.handlePageChange}>
                          {idx + 1}
                        </a>
                      </li>    
                    )
                  ))
                }
              </ul>
            </nav>
          </div>
        </div>
      </div>
      </>
    )
  }
}
