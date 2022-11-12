import logo from './logo.svg';
import './App.css';
import Navbar from './Components/Navbar';
import './Components/Navbar.css'
import List from './Components/List'
import './Components/List.css'
import Favourites from './Components/Favourites'
import './Components/Favourites.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <>
      {/* <Navbar/>
      <Banner/>
      <List/> */}
      <BrowserRouter>
      <Navbar/>
        <Routes>
          <Route path="/" element={<List/>}/>
          <Route path="/fav" element={<Favourites/>}/>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
