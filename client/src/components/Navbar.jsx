import React, { useState, useMemo, useRef, useContext } from 'react';
import { AllContext } from './App.jsx';

const Navbar = () => {
  const { setShowCards, setShowFavs } = useContext(AllContext);

  return (
    <div className='navbar'>
      <i
        className="bi bi-star-fill"
        style={{ color: '#F5B7B1', "font-size": "25px", cursor: 'pointer' }}
        onClick={() => {
          setShowCards(false);
          setShowFavs(true);
        }}
      />
      <h1> Tinder Cat </h1>

      <img
        src="https://cdn.worldvectorlogo.com/logos/tinder-2.svg"
        // width="30px"
        style={{ cursor: 'pointer'}}
        height="30px"
        onClick={() => {
          setShowCards(true);
          setShowFavs(false);
        }}
      />

    </div>
  )

}

export default Navbar;