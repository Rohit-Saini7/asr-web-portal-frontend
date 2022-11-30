import React from 'react';
import styled from 'styled-components';

const Preview = () => {
  return (
    <Container>
      <Heading>Preview/Download</Heading>

      <TableHeaderWrapper>
        <table cellpadding='0' cellspacing='0' border='0'>
          <thead>
            <tr>
              <th rowspan='2' colspan='1'>
                Sr. No.
              </th>
              <th rowspan='1' colspan='2'>
                Name
              </th>
              <th rowspan='1' colspan='2'>
                Language
              </th>
              <th rowspan='2' colspan='1'>
                Creation Time
              </th>
              <th rowspan='1' colspan='2'>
                Transcript
              </th>
              <th rowspan='1' colspan='2'>
                Translation
              </th>
            </tr>
            <tr>
              <th rowspan='2' colspan='1'>
                Media
              </th>
              <th rowspan='2' colspan='1'>
                Document
              </th>
              <th rowspan='1' colspan='1'>
                Source
              </th>
              <th rowspan='1' colspan='1'>
                Target
              </th>
              <th rowspan='1' colspan='1'>
                Preview
              </th>
              <th rowspan='1' colspan='1'>
                Download
              </th>
              <th rowspan='1' colspan='1'>
                Preview
              </th>
              <th rowspan='1' colspan='1'>
                Download
              </th>
            </tr>
          </thead>
        </table>
      </TableHeaderWrapper>
      <TableBodyWrapper>
        <table cellpadding='0' cellspacing='0' border='0'>
          <tbody>
            <tr>
              <td>1</td>
              <td>video.mp4</td>
              <td>doc1</td>
              <td>English</td>
              <td>Hindi</td>
              <td>00:00</td>
              <td>Preview</td>
              <td>Download</td>
              <td>Preview</td>
              <td>Download</td>
            </tr>

            <tr>
              <td>2</td>
              <td>video2.mp4</td>
              <td>doc2</td>
              <td>English</td>
              <td>Hindi</td>
              <td>00:01</td>
              <td>Preview</td>
              <td>Download</td>
              <td>Preview</td>
              <td>Download</td>
            </tr>
            <tr>
              <td>3</td>
              <td>video3.mp4</td>
              <td>doc3</td>
              <td>English</td>
              <td>Hindi</td>
              <td>00:03</td>
              <td>Preview</td>
              <td>Download</td>
              <td>Preview</td>
              <td>Download</td>
            </tr>
            <tr>
              <td>4</td>
              <td>video4.mp4</td>
              <td>doc4</td>
              <td>English</td>
              <td>Hindi</td>
              <td>00:04</td>
              <td>Preview</td>
              <td>Download</td>
              <td>Preview</td>
              <td>Download</td>
            </tr>
            <tr>
              <td>5</td>
              <td>video5.mp4</td>
              <td>doc5</td>
              <td>English</td>
              <td>Hindi</td>
              <td>00:05</td>
              <td>Preview</td>
              <td>Download</td>
              <td>Preview</td>
              <td>Download</td>
            </tr>
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
      font-weight: 500;
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
      padding: 15px;
      vertical-align: middle;
      font-weight: 300;
      font-size: 1rem;
    }
  }
`;
