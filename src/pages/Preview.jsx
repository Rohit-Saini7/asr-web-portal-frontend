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
        <TableWrapper>
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
        </TableWrapper>
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
  @media (min-width: 801px) {
    align-items: center;
  }
`;

const Heading = styled.h1`
  font-size: 2.5rem;
  margin-top: 2rem;
  width: max-content;
  align-self: center;
`;

const TableWrapper = styled.div`
  width: 95%;
  max-width: 1350px;
  margin-top: 30px;
  overflow: auto;
  & > table {
    border-radius: 10px;
    overflow: hidden;
    width: 100%;
    table-layout: auto;
    border: 1px solid var(--table-header-color);

    & > thead > tr > th {
      padding: 10px;
      font-weight: 600;
      font-size: 1rem;
      text-transform: uppercase;
      background-color: var(--table-header-color);
    }
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
