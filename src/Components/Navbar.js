import React, { Component } from 'react'
import { Link } from 'react-router-dom'

export default class Navbar extends Component {
  render() {
    return (
      <div className='navbar-cont'>
        <Link style={{textDecoration: 'none', color: 'maroon'}} 
        to="/">
          <h1>Movies App</h1>
        </Link>
        <Link style={{textDecoration: 'none', color: 'maroon'}} 
        to="/fav">
          <h2>Favourites</h2>
        </Link>
      </div>
    )
  }
}
