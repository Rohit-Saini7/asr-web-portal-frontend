import React, { useState } from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

import PendingModal from '../components/PendingModal';
import PreviewModal from '../components/PreviewModal';
import PreviewButtons from '../components/PreviewButtons';

const Preview = () => {
  const [isPending, setIsPending] = useState({
    name: 'transcript',
    status: false,
  });
  const [previewData, setPreviewData] = useState('');

  const user = useSelector((state) => state.userState.user);
  const docs = useSelector((state) => state.userState.docs);

  return (
    <React.Fragment>
      {isPending.status && (
        <PendingModal isPending={isPending} setIsPending={setIsPending} />
      )}
      {!!previewData && (
        <PreviewModal
          previewData={previewData}
          setPreviewData={setPreviewData}
        />
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
              {!docs.length ? (
                <tr>
                  <td>No Data Found</td>
                </tr>
              ) : (
                docs.map(
                  (
                    {
                      creationTime,
                      docName,
                      language,
                      mediaName,
                      modifyTime,
                      token,
                      willGenerate,
                    },
                    index
                  ) => (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>{mediaName}</td>
                      <td>{docName}</td>
                      <td>{language}</td>
                      <td>{creationTime}</td>
                      <td>{modifyTime}</td>
                      <PreviewButtons
                        docName={docName}
                        token={token}
                        setPreviewData={setPreviewData}
                        setIsPending={setIsPending}
                        willGenerate={willGenerate}
                      />
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
