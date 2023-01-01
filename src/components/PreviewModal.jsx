import React from 'react';
import styled from 'styled-components';
import AceEditor from 'react-ace';

const PreviewModal = ({ previewData, setPreviewData }) => {
  return (
    <Container>
      <InnerContainer>
        <CloseButton onClick={() => setPreviewData('')}>Close</CloseButton>
        <AceEditor
          fontSize='1rem'
          name='UNIQUE_ID_OF_DIV'
          value={previewData}
          width='100%'
          readOnly
          wrapEnabled
          showPrintMargin={false}
          style={{
            background: ' var(--signin-bg-color)',
            color: 'var(--font-color)',
          }}
        />
      </InnerContainer>
    </Container>
  );
};

export default PreviewModal;

const Container = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: 10;
  display: flex;
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
  box-shadow: var(--shadow);
  .ace_gutter {
    background: var(--signin-bg-color);
    color: var(--font-color);
  }
  .ace_gutter-active-line {
    background-color: var(--signin-bg-color);
  }
`;

const CloseButton = styled.button`
  margin: auto;
  border: none;
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
  &:focus {
    translate: 0 -2px;
  }
  &:active {
    translate: 0 2px;
  }
`;
