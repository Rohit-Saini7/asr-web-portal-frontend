import React from 'react';
import styled from 'styled-components';
import { DownloadIcon, PreviewIcon } from '../components/Icons';
import { DummyData } from './DummyDataForPreview';

const Preview = () => {
  const handleClick = (e) => {
    e.target.classList.toggle('active');
    setTimeout(() => {
      e.target.classList.toggle('active');
    }, 200);
  };
  return (
    <Container>
      <Heading>Preview/Download</Heading>
      <TableHeaderWrapper>
        <table cellPadding='0' cellSpacing='0' border='0'>
          <thead>
            <tr>
              <th rowSpan='2' colSpan='1'>
                Sr. No.
              </th>
              <th rowSpan='1' colSpan='2'>
                Name
              </th>
              <th rowSpan='1' colSpan='2'>
                Language
              </th>
              <th rowSpan='2' colSpan='2'>
                Creation Time
              </th>
              <th rowSpan='1' colSpan='2'>
                Preview/Download
              </th>
            </tr>
            <tr>
              <th rowSpan='2' colSpan='1'>
                Media
              </th>
              <th rowSpan='2' colSpan='1'>
                Document
              </th>
              <th rowSpan='1' colSpan='1'>
                Source
              </th>
              <th rowSpan='1' colSpan='1'>
                Target
              </th>
              <th rowSpan='1' colSpan='1'>
                Transcript
              </th>
              <th rowSpan='1' colSpan='1'>
                Translation
              </th>
            </tr>
          </thead>
        </table>
      </TableHeaderWrapper>
      <TableBodyWrapper>
        <table cellPadding='0' cellSpacing='0' border='0'>
          <tbody>
            {DummyData.map(
              (
                {
                  serialNumber,
                  mediaName,
                  documentName,
                  sourceLanguage,
                  targetLanguage,
                  creationTime,
                },
                index
              ) => (
                <tr key={index}>
                  <td>{serialNumber}</td>
                  <td>{mediaName}</td>
                  <td>{documentName}</td>
                  <td>{sourceLanguage}</td>
                  <td>{targetLanguage}</td>
                  <td colSpan='2'>{creationTime}</td>
                  <td>
                    <ButtonGroup className='button-group' id='thirdDimension'>
                      <Button className='button' onClick={handleClick}>
                        <PreviewIcon />
                        <i></i>
                      </Button>
                      <Button className='button' onClick={handleClick}>
                        <DownloadIcon />
                        <i></i>
                      </Button>
                    </ButtonGroup>
                  </td>
                  <td>
                    <ButtonGroup className='button-group' id='thirdDimension'>
                      <Button className='button' onClick={handleClick}>
                        <PreviewIcon />
                        <i></i>
                      </Button>
                      <Button className='button' onClick={handleClick}>
                        <DownloadIcon />
                        <i></i>
                      </Button>
                    </ButtonGroup>
                  </td>
                </tr>
              )
            )}
          </tbody>
        </table>
      </TableBodyWrapper>
    </Container>
  );
};

export default Preview;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
  text-align: center;
`;

const Heading = styled.h1`
  font-size: 2.5rem;
  margin-top: 2rem;
  width: fit-content;
  align-self: center;
`;

const TableHeaderWrapper = styled.div`
  background-color: var(--table-header-color);
  border: 1px solid transparent;
  border-radius: 10px 10px 0 0;
  margin-top: 30px;
  & > table {
    width: 100%;
    max-width: 1350px;
    table-layout: fixed;

    & > thead > tr > th {
      padding: 10px;
      font-weight: 600;
      font-size: 1rem;
      text-transform: uppercase;
    }
  }
`;

const TableBodyWrapper = styled.div`
  max-height: 60vh;
  overflow-x: auto;
  border: 1px solid var(--table-header-color);
  border-radius: 0 0 10px 10px;

  & > table {
    width: 100%;
    max-width: 1350px;
    table-layout: fixed;
    & > tbody > tr:nth-of-type(even) td {
      background: var(--table-body-color);
    }
    & > tbody > tr > td {
      padding: 5px 15px;
      vertical-align: middle;
      font-size: 1rem;
      font-weight: 500;
    }
  }
`;

const ButtonGroup = styled.div`
  margin: 0 auto;
  width: fit-content;
  max-height: 40px;
  overflow: hidden;
  border-radius: 10px;
`;

const Button = styled.div`
  background: var(--container-bg-color);
  border: none;
  width: 40px;
  height: 40px;
  padding: 6px;
  display: inline-block;
  font-size: 16px;
  margin: 0;
  position: relative;
  transition: 0.01s;

  & > svg {
    text-align: center;
    margin: 6px;
    display: block;
  }
  &:hover {
    background: var(--table-header-color);
  }

  &.active {
    font-size: 16px;
    text-shadow: 0 0 10px #fff;
    background: var(--table-header-color);
    height: 33px;
    vertical-align: bottom;
  }

  &.active svg {
    text-shadow: 0 0 10px #fff;
    margin-top: 6px;
    font-size: 14px;
  }

  &.active:before {
    content: '';
    position: absolute;
    z-index: 11;
    left: 0px;
    top: 0px;
    border-top: 33px solid var(--signin-color);
    border-right: 8px solid transparent;
  }
  &.active:after {
    content: '';
    position: absolute;
    z-index: 11;
    right: 0px;
    top: 0px;
    border-top: 33px solid var(--signin-color);
    border-left: 8px solid transparent;
  }

  &.active i:before {
    content: '';
    position: absolute;
    z-index: 11;
    left: 0px;
    top: -6px;
    border-bottom: 6px solid var(--signin-color);
    border-right: 8px solid transparent;
  }

  &.active i:after {
    content: '';
    position: absolute;
    z-index: 11;
    right: 0px;
    top: -6px;
    border-bottom: 6px solid var(--signin-color);
    border-left: 8px solid transparent;
  }
`;
