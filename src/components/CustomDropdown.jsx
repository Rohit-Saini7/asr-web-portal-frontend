import React from 'react';
import styled from 'styled-components';
import { DownArrowIcon } from './Icons';

const CustomDropdown = ({
  className,
  options = ['no option provided'],
  inputClass,
  wrapperClass,
  label,
  setLabel,
  title,
}) => {
  const handleClick = () => {
    let dropdown = document.querySelector('.' + wrapperClass);
    dropdown.classList.toggle('active');
  };

  const handleSelect = (e) => {
    // document.querySelector(inputClass).value = e.target.innerHTML;
    setLabel(e.target.innerHTML);
    document.querySelector(inputClass).classList.add('valid');
  };

  return (
    <Dropdown
      className={`${wrapperClass + ' ' + className}`}
      onClick={handleClick}
      title={title}
    >
      <Input
        type='text'
        className={inputClass}
        readOnly={true}
        required='required'
      />
      <InputLabel>{label}</InputLabel>
      <OptionWrapper className='options'>
        {options.map((option, index) => (
          <Option key={index} onClick={handleSelect}>
            {option}
          </Option>
        ))}
      </OptionWrapper>
      <DownArrowIcon />
      <i></i>
    </Dropdown>
  );
};

export default CustomDropdown;

const Dropdown = styled.div`
  margin: auto;
  position: relative;
  width: 100%;
  height: 50px;
  background-color: transparent;
  transition: 0.2s;

  & > i {
    position: absolute;
    left: 0;
    bottom: 0;
    width: 100%;
    height: 2px;
    background: var(--signin-color);
    border-radius: 4px;
    transition: 0.5s;
    pointer-events: none;
  }

  svg {
    height: 24px;
    width: 24px;
    z-index: 100;
    position: absolute;
    top: 50%;
    right: 20px;
    translate: 0 -50%;
    transition: 0.5s;
  }

  &.active svg {
    rotate: 180deg;
  }

  &.active > div,
  &:focus > div {
    visibility: visible;
    opacity: 1;
  }
`;

const Input = styled.input`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  cursor: pointer;
  border-radius: 10px;
  padding: 12px 20px;
  font-size: 1rem;
  background: transparent;
  outline: none;
  border: none;
  &.valid ~ span,
  &:focus ~ span {
    color: var(--signin-color);
    transform: translateY(-34px);
    font-size: 0.9rem;
  }
`;

const InputLabel = styled.span`
  position: absolute;
  left: 0;
  top: 0;
  z-index: 1000;
  padding: 20px 0px 10px;
  font-size: 1rem;
  color: var(--label-color);
  pointer-events: none;
  letter-spacing: 0.1rem;
  transition: 0.5s;
`;

const OptionWrapper = styled.div`
  position: absolute;
  top: 70px;
  width: 100%;
  border-radius: 10px;
  overflow: hidden;
  visibility: hidden;
  opacity: 0;
  transition: 0.25s;
  background-color: var(--background-color);
  box-shadow: var(--shadow);
`;

const Option = styled.div`
  padding: 12px 20px;
  cursor: pointer;
  transition: 0.5s;

  &:hover {
    background: var(--signin-color);
    color: var(--hover-font-color);
  }
`;
