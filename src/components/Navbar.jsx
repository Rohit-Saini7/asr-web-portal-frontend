import React from 'react';
import styled from 'styled-components';
import {
  DownArrowIcon,
  ExportIcon,
  HomeIcon,
  LinkIcon,
  PreviewIcon,
  SearchIcon,
  UserGroupIcon,
  UserIcon,
} from './Icons';

const Navbar = () => {
  return (
    <Container>
      <NavItem>
        <HomeIcon />
        Home
      </NavItem>
      <NavItem>
        <PreviewIcon />
        Preview/Download
      </NavItem>
      <NavItem>
        <UserGroupIcon />
        Associates
      </NavItem>
      <NavItem>
        <ExportIcon />
        Export Project
      </NavItem>
      <SearchBar>
        <SearchIcon />
        Search
      </SearchBar>
      <NavDropdown>
        <LinkIcon />
        Quick Links
        <DownArrowIcon />
      </NavDropdown>
      <NavDropdown>
        <UserIcon />
        User
        <DownArrowIcon />
      </NavDropdown>
    </Container>
  );
};

export default Navbar;

const Container = styled.nav`
  display: flex;
  width: 100%;
  max-width: 1500px;
  margin: auto;
  background-color: var(--container-bg-color);
  border-radius: 10px;
  margin-top: 20px;
  border: 1px solid var(--container-bg-color);
  align-items: center;
  justify-content: space-between;
  padding: 1.5rem;
  font-size: 1.25rem;
  user-select: none;
  color: var(--font-color);
  box-shadow: -11px 11px 22px #161616, 11px -11px 22px #323232;
  svg {
    height: 20px;
    width: 20px;
  }
`;

const NavItem = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
  cursor: pointer;
  padding: 5px 20px;
  border-radius: 20px;
  transition: 0.2s ease-in;
  border: 1px solid transparent;

  &:hover {
    border: 1px solid var(--font-color);
    color: var(--hover-font-color);
    box-shadow: -11px 11px 22px #161616, 11px -11px 22px #323232;
  }
  &:active {
    translate: 0 2px;
  }
`;

const SearchBar = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
  cursor: pointer;
  transition: 0.2s ease-in;
  border: 1px solid transparent;
  padding: 5px 20px;
  border-radius: 20px;
  &:hover {
    background-color: var(--background-color);
    border: 1px solid var(--font-color);
    color: var(--hover-font-color);
    box-shadow: -11px 11px 22px #161616, 11px -11px 22px #323232;
  }
  &:active {
    translate: 0 2px;
  }
`;

const NavDropdown = styled(NavItem)``;
