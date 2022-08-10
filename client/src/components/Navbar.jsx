import React, { useState, useMemo, useRef, useContext } from 'react';
import { AllContext } from './App.jsx';

const Navbar = () => {
  const { setShowCards, setShowFavs } = useContext(AllContext);

  return (
    <div className='navbar'>
      <i
        className="bi bi-star-fill"
        style={{ color: '#F5B7B1', "font-size": "25px" }}
        onClick={() => {
          setShowCards(false);
          setShowFavs(true);
        }}
      />
      <h1
      onClick={() => {
        setShowCards(true);
        setShowFavs(false);
      }}
      > Tinder Cat </h1>
      <i class="bi bi-envelope-fill" style={{ color: '#cdd1d0', "font-size": "25px" }} />
    </div>
  )

}

export default Navbar;