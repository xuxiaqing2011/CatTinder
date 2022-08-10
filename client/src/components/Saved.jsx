import React, { useState, useMemo, useRef, useContext, useEffect } from 'react';
import { AllContext } from './App.jsx';
import styled from 'styled-components';


const Saved = () => {
  let { cats } = useContext(AllContext);
  let savedCats = cats.filter(c => c.saved === true);
  return (
    <div className='images'>
      {savedCats.map(cat => {
        return <a href={cat.url} width="24%">
          <Img key={cat.name} src={cat.photos[0]}/>
          </a>
      })}
    </div>
  )
}

export default Saved;

const Img = styled.img`
  width: 100%;
  height: 100px;
  object-fit: cover;
  align-self: center;
  margin: 3px 3px;
  cursor: pointer;
`