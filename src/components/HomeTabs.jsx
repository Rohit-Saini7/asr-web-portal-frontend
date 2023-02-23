import React from 'react';
import styled from 'styled-components';

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
      <Tabs className='tabs' name='TTS' onClick={handleClick}>
        TTS <i></i>
      </Tabs>
      <Tabs className='tabs' name='V2V' onClick={handleClick}>
        V2V <i></i>
      </Tabs>
    </Container>
  );
};

export default HomeTabs;

const Container = styled.nav`
  margin: 20px auto;
  border-radius: 10px;
  padding: 10px;
  display: grid;
  align-items: center;
  gap: 20px;
  background-color: var(--main-color);
  @media (max-width: 800px) {
    width: 69%;
    grid-template-rows: 1fr;
  }
  @media (min-width: 801px) {
    width: 77%;
    grid-template-columns: 1fr 1fr 1fr 1fr;
  }
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
  color: var(--doc-bg-color);
  position: relative;

  &.active {
    background-color: var(--container-bg-color);
    color: var(--main-color);
  }

  @media (min-width: 801px) {
    &:hover {
      translate: 0 10px;
    }

    &.active {
      border-bottom-left-radius: 0;
      border-bottom-right-radius: 0;
      translate: 0 10px;
    }
    & > i::after {
      content: '';
      display: block;
      height: 1rem;
      width: 1rem;
      background-color: transparent;
      position: absolute;
      bottom: 0;
      right: -15px;
      border-bottom-left-radius: 12px;
      box-shadow: 0 6px 0 0.5px transparent;
    }
    & > i::before {
      content: '';
      display: block;
      height: 1rem;
      width: 1rem;
      background-color: transparent;
      position: absolute;
      bottom: 0;
      left: -15px;
      border-bottom-right-radius: 12px;
      box-shadow: 0 6px 0 0.5px transparent;
    }
    &.active > i::after {
      box-shadow: 0 6px 0 0.5px var(--container-bg-color);
    }

    &.active > i::before {
      box-shadow: 0 6px 0 0.5px var(--container-bg-color);
    }
  }
`;
