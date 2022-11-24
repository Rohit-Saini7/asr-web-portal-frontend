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
import ThemeSwitch from './ThemeSwitch';

const Navbar = () => {
  return (
    <React.Fragment>
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
          Profile
          <DownArrowIcon />
        </NavDropdown>
        <ThemeSwitch />
      </Container>
    </React.Fragment>
  );
};

export default Navbar;

const Container = styled.nav`
  display: flex;
  width: 100%;
  max-width: 1500px;
  margin: auto;
  background: var(--container-bg-color);
  border-radius: 10px;
  margin-top: 20px;
  border: 1px solid var(--container-bg-color);
  align-items: center;
  justify-content: space-between;
  padding: 1.5rem;
  font-size: 1.25rem;
  user-select: none;
  color: var(--font-color);
  box-shadow: var(--shadow);
  position: relative;
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
  transition: 0.1s ease;
  border: 1px solid transparent;

  &:hover {
    border: 1px solid var(--font-color);
    color: var(--hover-font-color);
    translate: 0 -2px;
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
  transition: 0.1s ease;
  border: 1px solid transparent;
  padding: 5px 20px;
  border-radius: 20px;
  &:hover {
    background: var(--background);
    border: 1px solid var(--font-color);
    color: var(--hover-font-color);
    translate: 0 -2px;
  }
  &:active {
    translate: 0 2px;
  }
`;

const NavDropdown = styled(NavItem)``;
