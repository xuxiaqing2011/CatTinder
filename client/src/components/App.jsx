import React, { useState, useEffect, useMemo, useRef, useContext } from 'react';
import axios from 'axios';
import Card from './Card.jsx';
import Navbar from './Navbar.jsx';
import './App.css';

export const AllContext = createContext();

const App = () => {
  const [cats, setCats] = useState([]);
  const [fav, setFav] = useState([]);
  const [showCards, setShowCards] = useState(true);
  const [showFavs, setShowFavs] = useState(false);

  useEffect(() => {
    axios.get('/cats')
      .then(res => {
        setCats(res.data);
      })
  }, [])


  return <div className='app'>
    <AllContext.Provider value={{ cats, setCats, fav, setFav }}>
      {/* <Navbar /> */}
      {showCards && <Card />}

      {showFavs && <div>Show Favorite</div>}

    </AllContext.Provider>

  </div>
}

export default App;