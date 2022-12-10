import React from 'react';
import styled from 'styled-components';

//? # Transcript
//?   - upload audio/ video
//?   - doc name

//? # Translation
//?  - upload transcript
//?   - doc name
//?   - source and target language

//? # tts
//?   - upload translation
//?   - doc name

const HomeTabs = ({ setTabSelected }) => {
  const handleClick = (e) => {
    const tabs = document.querySelectorAll('.tabs');
    tabs.forEach((item) => {
      item.classList.remove('active');
    });
    setTabSelected(
      (lastValue) =>
        lastValue !== e.target.attributes.name.value &&
        e.target.attributes.name.value
    );
    console.log(e);
    e.target.classList.add('active');
  };

  return (
    <Container>
      <Tabs className='tabs active' name='transcript' onClick={handleClick}>
        Transcript <i></i>
      </Tabs>
      <Tabs className='tabs' name='translation' onClick={handleClick}>
        Translation <i></i>
      </Tabs>
      <Tabs className='tabs' name='tts' onClick={handleClick}>
        TTS <i></i>
      </Tabs>
    </Container>
  );
};

export default HomeTabs;

const Container = styled.div`
  margin: 20px auto;
  border-radius: 10px;
  padding: 10px;
  width: 78%;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  align-items: center;
  gap: 20px;
  background-color: var(--signin-color);
`;

const Tabs = styled.div`
  width: 70%;
  justify-self: center;
  font-size: 1.5rem;
  font-weight: 700;
  padding: 1rem;
  border-radius: 10px;
  transition: 0.2s;
  cursor: pointer;
  color: var(--background-color);
  position: relative;

  &:hover {
    translate: 0 10px;
  }

  &.active {
    background-color: var(--signin-bg-color);
    color: var(--signin-color);
    border-bottom-left-radius: 0;
    border-bottom-right-radius: 0;
    translate: 0 10px;
  }

  & > i {
    transition: 25s;
  }
  & > i::after {
    content: '';
    display: block;
    height: 1rem;
    width: 1rem;
    background-color: transparent;
    position: absolute;
    bottom: 0;
    right: -16px;
    border-bottom-left-radius: 10px;
    box-shadow: 0 6px 0 0.6px transparent;
  }
  & > i::before {
    content: '';
    display: block;
    height: 1rem;
    width: 1rem;
    background-color: transparent;
    position: absolute;
    bottom: 0;
    left: -16px;
    border-bottom-right-radius: 10px;
    box-shadow: 0 6px 0 0.5px transparent;
  }

  &.active > i::after {
    box-shadow: 0 6px 0 0.6px var(--signin-bg-color);
  }

  &.active > i::before {
    box-shadow: 0 6px 0 0.5px var(--signin-bg-color);
  }
`;
