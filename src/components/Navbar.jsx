import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { addUser } from '../redux/slice/userSlice';

import { HomeIcon, LinkIcon, LogOutIcon, PreviewIcon } from './Icons';
import ThemeSwitch from './ThemeSwitch';

const Navbar = () => {
  const dispatch = useDispatch();
  const handleLogOut = () => dispatch(addUser(null));
  const [burgerState, setBurgerState] = useState('close');

  return (
    <React.Fragment>
      <Container>
        <Burger
          onClick={() => {
            setBurgerState((p) => (p === 'open' ? 'closing' : 'open'));
          }}
        >
          <BurgerIcon data-state={burgerState} />
        </Burger>
        <Nav
          data-state={burgerState}
          onAnimationEnd={() => {
            setBurgerState((p) => (p === 'closing' ? 'close' : 'open'));
          }}
        >
          <NavItem to='/home'>
            <HomeIcon />
            Home
          </NavItem>
          <NavItem to='/preview'>
            <PreviewIcon />
            Preview/Download
          </NavItem>
          <NavItem to='/home'>
            <LinkIcon />
            Quick Links
          </NavItem>
          <NavItem onClick={handleLogOut}>
            <LogOutIcon />
            Sign Out
          </NavItem>
        </Nav>
        <ThemeSwitch />
      </Container>
    </React.Fragment>
  );
};

export default Navbar;

const Container = styled.nav`
  width: 95%;
  max-width: 1350px;
  margin: auto;
  margin-top: 20px;
  background: var(--container-bg-color);
  border-radius: 10px;
  padding: 1.5rem;
  font-size: 1.25rem;
  user-select: none;
  box-shadow: var(--shadow);
  display: grid;
  grid-template-columns: 9fr 1fr;
  svg {
    height: 20px;
    width: 20px;
  }
`;

const Burger = styled.button`
  width: 32px;
  height: 32px;
  padding: 4px;
  margin-left: 20px;
  cursor: pointer;
  border: 0;
  background-color: transparent;
  display: none;
  transition: all 0.7s ease;
  z-index: 3;
  @media (max-width: 800px) {
    display: block;
  }
`;

const BurgerIcon = styled.div`
  position: relative;
  &,
  &::before,
  &::after {
    width: 24px;
    height: 2px;
    background: var(--font-color);
    transition: 0.3s;
  }
  &::before,
  &::after {
    position: absolute;
    content: '';
    left: 0;
  }
  &::before {
    top: -8px;
  }
  &::after {
    top: 8px;
  }
  &[data-state='open'] {
    background: transparent;
    &::before {
      transform: translateY(8px) rotate(45deg);
    }
    &::after {
      transform: translateY(-8px) rotate(-45deg);
    }
  }
`;

const Nav = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-evenly;

  @media (max-width: 800px) {
    z-index: 2;
    position: absolute;
    top: 0;
    left: 0;
    background: var(--nav-background-color);
    height: 100%;
    width: 100%;
    flex-direction: column;
    transition: clip-path 0.7s ease-in-out;
    &[data-state='open'] {
      animation: BurgerNavOpen 750ms ease-in-out forwards;
    }
    &[data-state='closing'] {
      animation: BurgerNavClose 750ms ease-in-out forwards;
    }
    &[data-state='close'] {
      display: none;
    }
  }
  @keyframes BurgerNavOpen {
    0% {
      clip-path: circle(0% at top left);
    }
    100% {
      clip-path: circle(250% at top left);
    }
  }
  @keyframes BurgerNavClose {
    0% {
      clip-path: circle(250% at top left);
    }
    100% {
      clip-path: circle(0% at top left);
    }
  }
`;

const NavItem = styled(Link)`
  text-decoration: none;
  color: var(--font-color);
  display: flex;
  align-items: center;
  gap: 5px;
  transition: all ease-in-out 250ms;
  position: relative;

  &::before {
    content: '';
    height: 3px;
    border-radius: 3px;
    width: 0%;
    background-color: var(--signin-color);
    position: absolute;
    bottom: -10px;
    transition: all ease-in-out 250ms;
  }

  &:hover {
    color: var(--signin-color);
    &::before {
      width: 100%;
    }
  }
  &:active {
    translate: 0 5px;
  }
`;
