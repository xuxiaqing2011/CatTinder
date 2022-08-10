import React, { useState, useMemo, useRef, useContext, useEffect } from 'react';
import axios from 'axios';
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
    setLastDirection(direction);
    updateCurrentIndex(index - 1);

    if (cat.saved === false && direction === 'right') {
      cat.saved = true;
      axios.put(`/cats/${cat.id}`)
        .then(() => console.log('Toggled to True'))
        .catch(e => console.log('Failed to toggle', e))
    } else if (cat.saved === true && direction !== 'right') {
      cat.saved = false;
      axios.put(`/cats/${cat.id}`)
        .then(() => console.log('Toggled to False'))
        .catch(e => console.log('Failed to toggle', e))
    }
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
    <>
      <div className='cardContainer'>
        {cats.map((cat, index) => (
          <TinderCard
            ref={childRefs[index]}
            className='swipe p-3 bg-light rounded'
            key={cat.name}
            onSwipe={(dir) => {
              swiped(dir, cat, index)
            }}
            onCardLeftScreen={() => outOfFrame(cat.name, index)}
          >
            <Img src={cat.photos[0]} className='card'></Img>
            <div>
              <div style={{ "font-weight": '600' }}>{cat.name}, {cat.age.toLowerCase()}</div>
              <div>{cat.size}, {cat.breeds.toLowerCase()}</div>
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

    </>
  )
}

export default Card;

const Img = styled.img`
  max-width: 260px;
  height: 300px;
  object-fit: cover;
  align-self: center;
`