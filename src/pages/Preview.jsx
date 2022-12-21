import React, { useState } from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { Navigate } from 'react-router-dom';

import { DownloadIcon, PreviewIcon, UploadIcon } from '../components/Icons';
import PendingModal from '../components/PendingModal';
// import { DummyData } from './DummyDataForPreview';

const Preview = () => {
  const [isPending, setIsPending] = useState({
    name: 'transcript',
    status: false,
  });

  const user = useSelector((state) => state.userState.user);
  const docs = useSelector((state) => state.userState.docs);

  const handleDownload = (downloadName, docName, token) => {
    const URL = `${import.meta.env.VITE_API_URL}/${token}`;

    axios({
      method: 'get',
      url: URL,
    })
      .then(function (response) {
        if (response.data === 'SUCCESS') {
          axios({
            method: 'get',
            url: `${URL}/result`,
            responseType: 'blob',
          })
            .then(function (res) {
              /* 
                ? to read the response for preview
               res.data
                .text()
                .then((resp) => console.log(`response : ${resp}`))
                .catch((e) => e); 
              */
              const fileURL = window.URL.createObjectURL(res.data);
              let alink = document.createElement('a');
              alink.href = fileURL;
              alink.download = `${docName}.xml`;
              alink.click();
            })
            .catch(function (error) {
              console.error(error);
            });
        } else {
          setIsPending(() => ({ status: true, name: downloadName }));
          setTimeout(() => {
            setIsPending(() => ({ status: false, name: downloadName }));
          }, 10000);
        }
      })
      .catch(function (error) {
        console.error(error);
      });
  };

  return (
    <React.Fragment>
      {isPending.status && (
        <PendingModal isPending={isPending} setIsPending={setIsPending} />
      )}
      <Container>
        {!user && <Navigate to='/' />}
        <Heading>Preview/Download</Heading>
        <TableHeaderWrapper>
          <table cellPadding='0' cellSpacing='0' border='0'>
            <thead>
              <tr>
                <th rowSpan='2'>Sr. No.</th>
                <th colSpan='2'>Name</th>
                <th colSpan='1'>Language</th>
                <th colSpan='2'>Time</th>
                <th colSpan='3'>Preview/Download</th>
              </tr>
              <tr>
                <th>Media</th>
                <th>Document</th>
                <th>Source|Target</th>
                <th>Creation</th>
                <th>Modify</th>
                <th>Transcript</th>
                <th>Translation</th>
                <th>TTS</th>
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
                      <td>
                        {!!targetLanguage ? targetLanguage : 'Hindi'} {' | '}
                        {!!targetLanguage ? targetLanguage : 'Hindi'}
                      </td>
                      <td>{creationTime}</td>
                      <td>{modifyTime}</td>
                      <td>
                        <ButtonGroup
                          className='button-group'
                          id='thirdDimension'
                        >
                          <Button className='button' onClick={handleAnimation}>
                            <PreviewIcon />
                            <i></i>
                          </Button>
                          <Button
                            className='button'
                            onClick={(e) => {
                              handleAnimation(e);
                              handleDownload('Transcript', docName, token);
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
                        <ButtonGroup
                          className='button-group'
                          id='thirdDimension'
                        >
                          <Button className='button' onClick={handleAnimation}>
                            <PreviewIcon />
                            <i></i>
                          </Button>
                          <Button
                            className='button'
                            onClick={(e) => {
                              handleAnimation(e);
                              handleDownload('Translation', docName, token);
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
                        <ButtonGroup
                          className='button-group'
                          id='thirdDimension'
                        >
                          <Button className='button' onClick={handleAnimation}>
                            <PreviewIcon />
                            <i></i>
                          </Button>
                          <Button
                            className='button'
                            onClick={(e) => {
                              handleAnimation(e);
                              handleDownload('TTS', docName, token);
                            }}
                          >
                            <DownloadIcon />
                            <i></i>
                          </Button>
                        </ButtonGroup>
                      </td>
                    </tr>
                  )
                )
              )}
            </tbody>
          </table>
        </TableBodyWrapper>
      </Container>
    </React.Fragment>
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
  width: max-content;
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
      padding: 5px;
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
  width: max-content;
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
