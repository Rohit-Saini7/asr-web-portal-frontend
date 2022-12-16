import React from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { Navigate } from 'react-router-dom';

import { DownloadIcon, PreviewIcon, UploadIcon } from '../components/Icons';
// import { DummyData } from './DummyDataForPreview';

const Preview = () => {
  const user = useSelector((state) => state.userState.user);
  const docs = useSelector((state) => state.userState.docs);

  const handleDownloadTranscript = (docName, token) => {
    const URL = `${import.meta.env.VITE_API_URL}/${token}`;
    let res;

    axios({
      method: 'get',
      url: URL,
    })
      .then(function (response) {
        console.log(response.data);
        if (response.data === 'SUCCESS') {
          axios({
            method: 'get',
            url: `${URL}/result`,
            responseType: 'blob',
          })
            .then(function (res) {
              console.log(res);
              console.log(res.data);
              // const blob = new Blob(res.data);
              const fileURL = window.URL.createObjectURL(res.data);
              let alink = document.createElement('a');
              alink.href = fileURL;
              alink.download = `${docName}.xml`;
              alink.click();
            })
            .catch(function (error) {
              console.log(error);
            });
        } else {
          console.log('not matched', res);
        }
      })
      .catch(function (error) {
        console.error(error);
      });
  };

  return (
    <Container>
      {!user && <Navigate to='/' />}
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
              <th rowSpan='1' colSpan='1'>
                Language
              </th>
              <th rowSpan='2' colSpan='1'>
                Creation Time
              </th>
              <th rowSpan='2' colSpan='1'>
                Modified Time
              </th>
              <th rowSpan='1' colSpan='3'>
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
                Target
              </th>
              <th rowSpan='1' colSpan='1'>
                Transcript
              </th>
              <th rowSpan='1' colSpan='1'>
                Translation
              </th>
              <th rowSpan='1' colSpan='1'>
                TTS
              </th>
            </tr>
          </thead>
        </table>
      </TableHeaderWrapper>
      <TableBodyWrapper>
        <table cellPadding='0' cellSpacing='0' border='0'>
          <tbody>
            {!docs ? (
              <tr>
                <td>No Data Found</td>
              </tr>
            ) : (
              docs.map(
                (
                  {
                    creationTime,
                    docName,
                    mediaName,
                    modifyTime,
                    targetLanguage,
                    token,
                  },
                  index
                ) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{mediaName}</td>
                    <td>{docName}</td>
                    <td>{!!targetLanguage ? targetLanguage : 'Hindi'}</td>
                    <td>{creationTime}</td>
                    <td>{modifyTime}</td>
                    <td>
                      <ButtonGroup className='button-group' id='thirdDimension'>
                        <Button className='button' onClick={handleAnimation}>
                          <PreviewIcon />
                          <i></i>
                        </Button>
                        <Button
                          className='button'
                          onClick={(e) => {
                            handleAnimation(e);
                            handleDownloadTranscript(docName, token);
                          }}
                        >
                          <DownloadIcon />
                          <i></i>
                        </Button>
                        <Button className='button' onClick={handleAnimation}>
                          <UploadIcon />
                          <i></i>
                        </Button>
                      </ButtonGroup>
                    </td>
                    <td>
                      <ButtonGroup className='button-group' id='thirdDimension'>
                        <Button className='button' onClick={handleAnimation}>
                          <PreviewIcon />
                          <i></i>
                        </Button>
                        <Button className='button' onClick={handleAnimation}>
                          <DownloadIcon />
                          <i></i>
                        </Button>
                        <Button className='button' onClick={handleAnimation}>
                          <UploadIcon />
                          <i></i>
                        </Button>
                      </ButtonGroup>
                    </td>
                    <td>
                      <ButtonGroup className='button-group' id='thirdDimension'>
                        <Button className='button' onClick={handleAnimation}>
                          <PreviewIcon />
                          <i></i>
                        </Button>
                        <Button className='button' onClick={handleAnimation}>
                          <DownloadIcon />
                          <i></i>
                        </Button>
                      </ButtonGroup>
                    </td>
                  </tr>
                )
              )
              /* <tr>
                <td>Data Found</td>
              </tr> */
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

//* It is just for animation in Button Group.
const handleAnimation = (e) => {
  e.target.classList.toggle('active');
  setTimeout(() => {
    e.target.classList.toggle('active');
  }, 200);
};

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
    /* height: 33px; */
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

  &:active {
    transform: translateY(2px);
  }
`;
