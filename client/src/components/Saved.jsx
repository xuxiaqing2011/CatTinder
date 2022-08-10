import React, { useState, useMemo, useRef, useContext, useEffect } from 'react';
import { AllContext } from './App.jsx';
import styled from 'styled-components';


const Saved = () => {
  let { cats } = useContext(AllContext);
  let savedCats = cats.filter(c => c.saved === true);
  return (
    <div className='images'>
      {savedCats.map(cat => {
        return (
          <div style={{ width: "23%", height: "100px" }}>
          <a href={cat.url}>
            <Img key={cat.name} src={cat.photos[0]} />
          </a>
          </div>
        )
      })}
    </div>
  )
}

export default Saved;

const Img = styled.img`
  width: 90%;
  height: 90%;
  object-fit: cover;
  align-self: center;
  margin: 3px 3px;
  cursor: pointer;
`