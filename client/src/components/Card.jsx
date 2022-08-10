import React, { useState, useMemo, useRef, useContext, useEffect } from 'react';
import TinderCard from 'react-tinder-card';
import { AllContext } from './App.jsx';
import styled from 'styled-components';


const Card = () => {
  const { cats, setShowCards, setShowFavs } = useContext(AllContext);
  const [currentIndex, setCurrentIndex] = useState(cats.length - 1);
  const [lastDirection, setLastDirection] = useState();
  // used for outOfFrame closure
  const currentIndexRef = useRef(currentIndex);

  const childRefs = useMemo(
    () =>
      Array(cats.length)
        .fill(0)
        .map((i) => React.createRef()),
    [cats]
  );

  useEffect(() => {
    setCurrentIndex(cats.length - 1);
  }, [cats])

  const updateCurrentIndex = (val) => {
    setCurrentIndex(val)
    currentIndexRef.current = val
  }

  const canGoBack = currentIndex < cats.length - 1

  const canSwipe = currentIndex >= 0

  // set last direction and decrease current index
  const swiped = (direction, cat, index) => {
    if (direction === 'right') {
      cat.saved = true;
    } else if (direction !== 'right') {
      cat.saved = false;
    }
    setLastDirection(direction)
    updateCurrentIndex(index - 1)
  }

  const outOfFrame = (name, idx) => {
    console.log(`${name} (${idx}) left the screen!`, currentIndexRef.current)
    // handle the case in which go back is pressed before card goes outOfFrame
    currentIndexRef.current >= idx && childRefs[idx].current.restoreCard()
    // TODO: when quickly swipe and restore multiple times the same card,
    // it happens multiple outOfFrame events are queued and the card disappear
    // during latest swipes. Only the last outOfFrame event should be considered valid
  }

  const swipe = async (dir) => {
    if (canSwipe && currentIndex < cats.length) {
      await childRefs[currentIndex].current.swipe(dir) // Swipe the card!
    }
  }

  // increase current index and show card
  const goBack = async () => {
    if (!canGoBack) return
    const newIndex = currentIndex + 1
    updateCurrentIndex(newIndex)
    await childRefs[newIndex].current.restoreCard()
  }

  return (
    <div>
      {/* <div className='navbar'>
        <i
          className="bi bi-star-fill"
          style={{ color: '#F5B7B1', "font-size": "25px" }}
          onClick={() => {
            setShowCards(false);
            setShowFavs(true);
          }}
        />
        <h1 onClick={() => {
          setShowCards(true);
          setShowFavs(false);
        }}> Tinder Cat </h1>
        <i class="bi bi-envelope-fill" style={{ color: '#cdd1d0', "font-size": "25px" }} />
      </div> */}
      <div className='cardContainer'>
        {cats.map((cat, index) => (
          <TinderCard
            ref={childRefs[index]}
            className='swipe'
            key={cat.name}
            onSwipe={(dir) => {
              swiped(dir, cat, index)
            }}
            onCardLeftScreen={() => outOfFrame(cat.name, index)}
          >
            <div
              style={{ backgroundImage: `url(${cat.photos[0]})` }}
              className='card'
            >
              {/* <img src={cat.photos[0]}></img> */}
              <div>{cat.name}</div>
              <div>{cat.age}</div>
              <div>{cat.breeds}</div>
              <div>{cat.size}</div>
            </div>
          </TinderCard>
        ))}
      </div>
      <div className='buttons'>
        <button
          style={{ backgroundColor: !canSwipe && '#c3c4d3' }}
          onClick={() => swipe('left')}>
          <i class="bi bi-x-lg" style={{ "font-size": "25px", "color": "#E74C3C" }} />
        </button>
        <button
          style={{ backgroundColor: !canGoBack && '#c3c4d3' }}
          onClick={() => {
            goBack();
          }}>
          <i class="bi bi-arrow-counterclockwise" style={{ "font-size": "25px", color: '#2f2e2e' }} />
        </button>
        <button
          style={{ backgroundColor: !canSwipe && '#c3c4d3' }}
          onClick={() => swipe('right')}>
          {cats[currentIndex] && cats[currentIndex].saved ?
            <i class="bi bi-heart-fill"
              style={{ "font-size": "25px", "color": "#c94884" }}
            /> :
            <i class="bi bi-heart-fill"
              style={{ "font-size": "25px", "color": "#48C9B0" }}
            />
          }
        </button>
      </div>

    </div>
  )
}

export default Card;