import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { CheckIcon, EqualIcon, GaugeHighIcon, HourglassIcon } from './Icons';

const ProgressModal = ({ progressData, setIsModalOpen }) => {
  return (
    <Container>
      <InnerContainer>
        {progressData.progress === 100 ? (
          <React.Fragment>
            <Heading>Upload Succesful</Heading>
            <SubHeading>
              You will be notified with mail when transcript is generated
              succesfully.
            </SubHeading>
            <Link to='/preview'>
              <CloseButton onClick={() => setIsModalOpen(false)}>
                Close
              </CloseButton>
            </Link>
          </React.Fragment>
        ) : (
          <React.Fragment>
            <ProgressBar progress={progressData.progress} />
            <Data>
              <DataItem title='File Size'>
                <EqualIcon />
                {progressData.total} MB
              </DataItem>
              <DataItem title='Done '>
                <CheckIcon />
                {progressData.done} MB
              </DataItem>
              <DataItem title='Upload Speed'>
                <GaugeHighIcon />
                {progressData.rate} MBPS
              </DataItem>
              <DataItem title='Remaning Time'>
                <HourglassIcon />
                {progressData.estimated} Sec
              </DataItem>
            </Data>
          </React.Fragment>
        )}
      </InnerContainer>
    </Container>
  );
};

export default ProgressModal;

const Container = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  display: flex;
  z-index: 10000;
  align-items: center;
  justify-content: center;
  background: rgba(255, 255, 255, 0.3);
`;

const InnerContainer = styled.div`
  max-width: 1350px;
  width: 100%;
  background: var(--signin-bg-color);
  position: relative;
  border-radius: 10px;
  padding: 40px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 30px;
`;

const Heading = styled.h2`
  font-size: 2rem;
  width: max-content;
  align-self: center;
`;

const SubHeading = styled.h3`
  font-size: 1.5rem;
  width: 50%;
  align-self: center;
  text-align: center;
`;

const CloseButton = styled.button`
  margin: auto;
  border: none;
  outline: none;
  background: var(--signin-color);
  color: var(--background-color);
  padding: 11px 25px;
  width: 100%;
  max-width: max-content;
  align-self: center;
  margin-top: 10px;
  border-radius: 5px;
  font-size: 1.2rem;
  font-weight: 600;
  cursor: pointer;
  transition: 0.2s;
  box-shadow: var(--shadow);
  &:hover {
    translate: 0 -2px;
  }
  &:active {
    translate: 0 2px;
  }
`;

const ProgressBar = styled.div`
  width: 70%;
  padding: 4px;
  background: rgba(0, 0, 0, 0.25);
  border-radius: 6px;
  box-shadow: inset 0 1px 2px rgba(0, 0, 0, 0.25),
    0 1px rgba(255, 255, 255, 0.08);

  &::after {
    content: '';
    display: block;
    height: 16px;
    border-radius: 4px;
    background-image: linear-gradient(
      to bottom,
      rgba(255, 255, 255, 0.3),
      rgba(255, 255, 255, 0.05)
    );
    transition: 0.4s linear;
    transition-property: width, background-color;
    box-shadow: 0 0 1px 1px rgba(0, 0, 0, 0.25),
      inset 0 1px rgba(255, 255, 255, 0.1);
    width: ${({ progress }) => progress}%;
    background-color: ${({ progress }) => {
      if (0 < progress <= 10) return '#86e01e';
      else if (10 < progress <= 25) return '#f27011';
      else if (25 < progress <= 50) return '#f2b01e';
      else if (50 < progress <= 75) return '#f2d31b';
      else if (75 < progress <= 100) return '#86e01e';
      else return '#f63a0f';
    }};
    /* animation: progress 5s infinite; */
    /* @keyframes progress {
      0% {
        width: 0%;
        background-color: #f63a0f;
      }
      25% {
        background-color: #f27011;
      }
      50% {
        background-color: #f2b01e;
      }
      75% {
        background-color: #f2d31b;
      }
      100% {
        width: 100%;
        background-color: #86e01e;
      }
    } */
  }
`;

const Data = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 30px;
  font-size: 1.5rem;
`;

const DataItem = styled.div`
  display: flex;
  gap: 10px;
  justify-content: center;
  align-items: center;
  & > svg {
    width: 30px;
    height: 30px;
  }
`;
