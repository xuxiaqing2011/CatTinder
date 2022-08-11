import React, { useState, useEffect, useMemo, useRef, createContext } from 'react';
import axios from 'axios';
import Card from './Card.jsx';
import Saved from './Saved.jsx';
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
  }, []);


  return (
    <div className='app'>

      <AllContext.Provider value={{ cats, setShowCards, setShowFavs }}>
        <Navbar />
        {showCards && <Card />}
        {showFavs && <Saved />}
      </AllContext.Provider>

    </div>
  )
}

export default App;